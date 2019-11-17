// @GENERATOR:play-routes-compiler
// @SOURCE:/mnt/c/Users/Joni/devel/WorkMan/workman-scala-back/conf/routes
// @DATE:Sun Nov 17 09:04:16 EET 2019

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

  
    // @LINE:5
    def createUser(): Call = {
      
      Call("POST", _prefix + { _defaultPrefix } + "api/users")
    }
  
    // @LINE:3
    def readUser(id:reactivemongo.bson.BSONObjectID): Call = {
      
      Call("GET", _prefix + { _defaultPrefix } + "api/users/" + play.core.routing.dynamicString(implicitly[play.api.mvc.PathBindable[reactivemongo.bson.BSONObjectID]].unbind("id", id)))
    }
  
    // @LINE:9
    def deleteUser(id:reactivemongo.bson.BSONObjectID): Call = {
      
      Call("DELETE", _prefix + { _defaultPrefix } + "api/users/" + play.core.routing.dynamicString(implicitly[play.api.mvc.PathBindable[reactivemongo.bson.BSONObjectID]].unbind("id", id)))
    }
  
    // @LINE:2
    def listUsers(): Call = {
      
      Call("GET", _prefix + { _defaultPrefix } + "api/users")
    }
  
    // @LINE:7
    def updateUser(id:reactivemongo.bson.BSONObjectID): Call = {
      
      Call("PUT", _prefix + { _defaultPrefix } + "api/users/" + play.core.routing.dynamicString(implicitly[play.api.mvc.PathBindable[reactivemongo.bson.BSONObjectID]].unbind("id", id)))
    }
  
  }


}
