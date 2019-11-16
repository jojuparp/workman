package models

import play.api.libs.json.{Json, OFormat}
import reactivemongo.bson.BSONObjectID
import reactivemongo.play.json._
import org.checkerframework.common.aliasing.qual.Unique

case class User(
  username: String,
  name: String,
  admin: Boolean,
  passwordHash: Option[String],
  jobs: Option[Array[BSONObjectID]]
)

object User {
  implicit val format: OFormat[User] = Json.format[User]
}