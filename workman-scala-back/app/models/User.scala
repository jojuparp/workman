package models

import play.api.libs.json.{Json, OFormat}
import reactivemongo.bson.BSONObjectID
import reactivemongo.play.json._

case class User(
  _id: Option[BSONObjectID],
  username: String,
  name: String,
)

object User {
  implicit val format: OFormat[User] = Json.format[User]
}