// @GENERATOR:play-routes-compiler
// @SOURCE:/mnt/c/Users/Joni/devel/WorkMan/workman-scala-back/conf/routes
// @DATE:Sat Nov 16 15:45:49 EET 2019

package router

import play.core.routing._
import play.core.routing.HandlerInvokerFactory._

import play.api.mvc._

import _root_.controllers.Assets.Asset
import _root_.play.modules.reactivemongo.PathBindables._

class Routes(
  override val errorHandler: play.api.http.HttpErrorHandler, 
  // @LINE:1
  AppController_0: controllers.AppController,
  // @LINE:2
  UserController_1: controllers.UserController,
  val prefix: String
) extends GeneratedRouter {

   @javax.inject.Inject()
   def this(errorHandler: play.api.http.HttpErrorHandler,
    // @LINE:1
    AppController_0: controllers.AppController,
    // @LINE:2
    UserController_1: controllers.UserController
  ) = this(errorHandler, AppController_0, UserController_1, "/")

  def withPrefix(addPrefix: String): Routes = {
    val prefix = play.api.routing.Router.concatPrefix(addPrefix, this.prefix)
    router.RoutesPrefix.setPrefix(prefix)
    new Routes(errorHandler, AppController_0, UserController_1, prefix)
  }

  private[this] val defaultPrefix: String = {
    if (this.prefix.endsWith("/")) "" else "/"
  }

  def documentation = List(
    ("""GET""", this.prefix, """controllers.AppController.index"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/users""", """controllers.UserController.listUsers"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/users""", """controllers.UserController.createUser"""),
    Nil
  ).foldLeft(List.empty[(String,String,String)]) { (s,e) => e.asInstanceOf[Any] match {
    case r @ (_,_,_) => s :+ r.asInstanceOf[(String,String,String)]
    case l => s ++ l.asInstanceOf[List[(String,String,String)]]
  }}


  // @LINE:1
  private[this] lazy val controllers_AppController_index0_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix)))
  )
  private[this] lazy val controllers_AppController_index0_invoker = createInvoker(
    AppController_0.index,
    play.api.routing.HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.AppController",
      "index",
      Nil,
      "GET",
      this.prefix + """""",
      """""",
      Seq()
    )
  )

  // @LINE:2
  private[this] lazy val controllers_UserController_listUsers1_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/users")))
  )
  private[this] lazy val controllers_UserController_listUsers1_invoker = createInvoker(
    UserController_1.listUsers,
    play.api.routing.HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.UserController",
      "listUsers",
      Nil,
      "GET",
      this.prefix + """api/users""",
      """""",
      Seq()
    )
  )

  // @LINE:5
  private[this] lazy val controllers_UserController_createUser2_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/users")))
  )
  private[this] lazy val controllers_UserController_createUser2_invoker = createInvoker(
    UserController_1.createUser,
    play.api.routing.HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.UserController",
      "createUser",
      Nil,
      "POST",
      this.prefix + """api/users""",
      """""",
      Seq()
    )
  )


  def routes: PartialFunction[RequestHeader, Handler] = {
  
    // @LINE:1
    case controllers_AppController_index0_route(params@_) =>
      call { 
        controllers_AppController_index0_invoker.call(AppController_0.index)
      }
  
    // @LINE:2
    case controllers_UserController_listUsers1_route(params@_) =>
      call { 
        controllers_UserController_listUsers1_invoker.call(UserController_1.listUsers)
      }
  
    // @LINE:5
    case controllers_UserController_createUser2_route(params@_) =>
      call { 
        controllers_UserController_createUser2_invoker.call(UserController_1.createUser)
      }
  }
}
