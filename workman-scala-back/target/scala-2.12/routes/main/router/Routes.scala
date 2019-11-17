// @GENERATOR:play-routes-compiler
// @SOURCE:/mnt/c/Users/Joni/devel/WorkMan/workman-scala-back/conf/routes
// @DATE:Sun Nov 17 09:04:16 EET 2019

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
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/users/""" + "$" + """id<[^/]+>""", """controllers.UserController.readUser(id:reactivemongo.bson.BSONObjectID)"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/users""", """controllers.UserController.createUser"""),
    ("""PUT""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/users/""" + "$" + """id<[^/]+>""", """controllers.UserController.updateUser(id:reactivemongo.bson.BSONObjectID)"""),
    ("""DELETE""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/users/""" + "$" + """id<[^/]+>""", """controllers.UserController.deleteUser(id:reactivemongo.bson.BSONObjectID)"""),
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

  // @LINE:3
  private[this] lazy val controllers_UserController_readUser2_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/users/"), DynamicPart("id", """[^/]+""",true)))
  )
  private[this] lazy val controllers_UserController_readUser2_invoker = createInvoker(
    UserController_1.readUser(fakeValue[reactivemongo.bson.BSONObjectID]),
    play.api.routing.HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.UserController",
      "readUser",
      Seq(classOf[reactivemongo.bson.BSONObjectID]),
      "GET",
      this.prefix + """api/users/""" + "$" + """id<[^/]+>""",
      """""",
      Seq()
    )
  )

  // @LINE:5
  private[this] lazy val controllers_UserController_createUser3_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/users")))
  )
  private[this] lazy val controllers_UserController_createUser3_invoker = createInvoker(
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

  // @LINE:7
  private[this] lazy val controllers_UserController_updateUser4_route = Route("PUT",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/users/"), DynamicPart("id", """[^/]+""",true)))
  )
  private[this] lazy val controllers_UserController_updateUser4_invoker = createInvoker(
    UserController_1.updateUser(fakeValue[reactivemongo.bson.BSONObjectID]),
    play.api.routing.HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.UserController",
      "updateUser",
      Seq(classOf[reactivemongo.bson.BSONObjectID]),
      "PUT",
      this.prefix + """api/users/""" + "$" + """id<[^/]+>""",
      """""",
      Seq()
    )
  )

  // @LINE:9
  private[this] lazy val controllers_UserController_deleteUser5_route = Route("DELETE",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/users/"), DynamicPart("id", """[^/]+""",true)))
  )
  private[this] lazy val controllers_UserController_deleteUser5_invoker = createInvoker(
    UserController_1.deleteUser(fakeValue[reactivemongo.bson.BSONObjectID]),
    play.api.routing.HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.UserController",
      "deleteUser",
      Seq(classOf[reactivemongo.bson.BSONObjectID]),
      "DELETE",
      this.prefix + """api/users/""" + "$" + """id<[^/]+>""",
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
  
    // @LINE:3
    case controllers_UserController_readUser2_route(params@_) =>
      call(params.fromPath[reactivemongo.bson.BSONObjectID]("id", None)) { (id) =>
        controllers_UserController_readUser2_invoker.call(UserController_1.readUser(id))
      }
  
    // @LINE:5
    case controllers_UserController_createUser3_route(params@_) =>
      call { 
        controllers_UserController_createUser3_invoker.call(UserController_1.createUser)
      }
  
    // @LINE:7
    case controllers_UserController_updateUser4_route(params@_) =>
      call(params.fromPath[reactivemongo.bson.BSONObjectID]("id", None)) { (id) =>
        controllers_UserController_updateUser4_invoker.call(UserController_1.updateUser(id))
      }
  
    // @LINE:9
    case controllers_UserController_deleteUser5_route(params@_) =>
      call(params.fromPath[reactivemongo.bson.BSONObjectID]("id", None)) { (id) =>
        controllers_UserController_deleteUser5_invoker.call(UserController_1.deleteUser(id))
      }
  }
}
