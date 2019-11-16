package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import reactivemongo.bson.BSONObjectID

import repositories.UserRepository
import models.User

class UserController @Inject() (
  implicit ec: ExecutionContext,
  cc: ControllerComponents,
  usersRepo: UserRepository
) extends AbstractController(cc) {

  def listUsers = Action.async {
    usersRepo.list().map { user =>
      Ok(Json.toJson(user))
    }
  }

  def createUser = Action.async(parse.json) {
    _.body.validate[User].map { user =>
      usersRepo.create(user).map { _ => 
        Created
      }
    }.getOrElse(Future.successful(BadRequest("invalid format")))
  }


}



