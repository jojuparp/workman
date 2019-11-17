package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import reactivemongo.bson.BSONObjectID

import repositories.UserRepository
import models.User

@Singleton
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

  def createUser = Action.async(parse.json) { implicit request =>
    request.body
      .validate[User]
      .map { user =>
        usersRepo.create(user).map { _ =>
          Created
        }
      }
      .getOrElse(Future.successful(BadRequest("Invalid format")))
  }

  def readUser(id: BSONObjectID) = Action.async {
    usersRepo.read(id).map { maybeUser => 
      maybeUser.map { user =>
        Ok(Json.toJson(user))
      }.getOrElse(NotFound)
    }
  }

  def updateUser(id: BSONObjectID) = Action.async(parse.json) { implicit request =>
    request.body.validate[User].map { user =>
      usersRepo.update(id, user).map {
        case Some(user) => Ok(Json.toJson(user))
        case _          => NotFound
      }
    }.getOrElse(Future.successful(BadRequest("invalid format")))
  }

  def deleteUser(id: BSONObjectID) = Action.async {
    usersRepo.delete(id).map {
      case Some(user) => Ok(Json.toJson(user))
      case _          => NotFound
    }
  }

}



