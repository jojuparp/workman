// @GENERATOR:play-routes-compiler
// @SOURCE:/mnt/c/Users/Joni/devel/WorkMan/workman-scala-back/conf/routes
// @DATE:Sun Nov 17 09:04:16 EET 2019

import play.api.routing.JavaScriptReverseRoute


import _root_.controllers.Assets.Asset
import _root_.play.modules.reactivemongo.PathBindables._

// @LINE:1
package controllers.javascript {

  // @LINE:1
  class ReverseAppController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:1
    def index: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.AppController.index",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + """"})
        }
      """
    )
  
  }

  // @LINE:2
  class ReverseUserController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:5
    def createUser: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.UserController.createUser",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "api/users"})
        }
      """
    )
  
    // @LINE:3
    def readUser: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.UserController.readUser",
      """
        function(id0) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "api/users/" + encodeURIComponent((""" + implicitly[play.api.mvc.PathBindable[reactivemongo.bson.BSONObjectID]].javascriptUnbind + """)("id", id0))})
        }
      """
    )
  
    // @LINE:9
    def deleteUser: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.UserController.deleteUser",
      """
        function(id0) {
          return _wA({method:"DELETE", url:"""" + _prefix + { _defaultPrefix } + """" + "api/users/" + encodeURIComponent((""" + implicitly[play.api.mvc.PathBindable[reactivemongo.bson.BSONObjectID]].javascriptUnbind + """)("id", id0))})
        }
      """
    )
  
    // @LINE:2
    def listUsers: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.UserController.listUsers",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "api/users"})
        }
      """
    )
  
    // @LINE:7
    def updateUser: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.UserController.updateUser",
      """
        function(id0) {
          return _wA({method:"PUT", url:"""" + _prefix + { _defaultPrefix } + """" + "api/users/" + encodeURIComponent((""" + implicitly[play.api.mvc.PathBindable[reactivemongo.bson.BSONObjectID]].javascriptUnbind + """)("id", id0))})
        }
      """
    )
  
  }


}
