package repositories
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.play.json._
import reactivemongo.play.json.collection.JSONCollection
import reactivemongo.bson.{BSONDocument, BSONObjectID}
import reactivemongo.api.{ReadPreference, Cursor}

import models.User


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
}