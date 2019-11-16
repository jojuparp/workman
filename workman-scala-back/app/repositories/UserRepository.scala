package repositories
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.play.json._
import reactivemongo.play.json.collection.JSONCollection
import reactivemongo.bson.{BSONDocument, BSONObjectID}
import reactivemongo.api.{ReadPreference, Cursor}

import models.User
import reactivemongo.api.commands.WriteResult

class UserRepository @Inject()(
  implicit ec: ExecutionContext,
  reactiveMongoApi: ReactiveMongoApi
) {

  private def collection: Future[JSONCollection] =
    reactiveMongoApi.database.map(_.collection("users"))

  def list(limit: Int = 100): Future[Seq[User]] = 
    collection.flatMap(_
      .find(BSONDocument())
        .cursor[User](ReadPreference.primary)
        .collect[Seq](limit, Cursor.FailOnError[Seq[User]]())
    )

  def create(user: User): Future[WriteResult] = 
    collection.flatMap(_.insert(user))

  def read(id: BSONObjectID): Future[Option[User]] =
    collection.flatMap(_
      .find(BSONDocument("_id" -> id))
        .one[User]
    )

  //esimerkki! ei käytetä käyttäjän kanssa!
  def update(id: BSONObjectID, user: User): Future[Option[User]] = 
    collection.flatMap(_
      .findAndUpdate(
        BSONDocument("_id" -> id),
        BSONDocument(
          f"$$set" -> BSONDocument(
            "username" -> user.username,
            "name" -> user.name
          )
        ),
        true
      ).map(_.result[User])
    )

  def delete(id: BSONObjectID): Future[Option[User]] =
    collection.flatMap(_
      .findAndRemove(BSONDocument("id" -> id))
        .map(_.result[User])
    )
}