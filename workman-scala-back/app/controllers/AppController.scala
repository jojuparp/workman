package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.ExecutionContext

import repositories.UserRepository

@Singleton
class AppController @Inject()(
  implicit ec: ExecutionContext,
  cc: ControllerComponents,
  usersRepo: UserRepository
  ) extends AbstractController(cc) {

  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(
      Json.obj(
        "app" -> "works"
      )
    )
  }

}
