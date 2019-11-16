// @GENERATOR:play-routes-compiler
// @SOURCE:/mnt/c/Users/Joni/devel/WorkMan/workman-scala-back/conf/routes
// @DATE:Sat Nov 16 15:45:49 EET 2019

import play.api.mvc.Call


import _root_.controllers.Assets.Asset
import _root_.play.modules.reactivemongo.PathBindables._

// @LINE:1
package controllers {

  // @LINE:1
  class ReverseAppController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:1
    def index(): Call = {
      
      Call("GET", _prefix)
    }
  
  }

  // @LINE:2
  class ReverseUserController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:2
    def listUsers(): Call = {
      
      Call("GET", _prefix + { _defaultPrefix } + "api/users")
    }
  
    // @LINE:5
    def createUser(): Call = {
      
      Call("POST", _prefix + { _defaultPrefix } + "api/users")
    }
  
  }


}
