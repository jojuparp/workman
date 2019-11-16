// @GENERATOR:play-routes-compiler
// @SOURCE:/mnt/c/Users/Joni/devel/WorkMan/workman-scala-back/conf/routes
// @DATE:Sat Nov 16 15:45:49 EET 2019

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

  
    // @LINE:2
    def listUsers: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.UserController.listUsers",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "api/users"})
        }
      """
    )
  
    // @LINE:5
    def createUser: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.UserController.createUser",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "api/users"})
        }
      """
    )
  
  }


}
