// @GENERATOR:play-routes-compiler
// @SOURCE:/mnt/c/Users/Joni/devel/WorkMan/workman-scala-back/conf/routes
// @DATE:Sat Nov 16 15:45:49 EET 2019

package controllers;

import router.RoutesPrefix;

public class routes {
  
  public static final controllers.ReverseAppController AppController = new controllers.ReverseAppController(RoutesPrefix.byNamePrefix());
  public static final controllers.ReverseUserController UserController = new controllers.ReverseUserController(RoutesPrefix.byNamePrefix());

  public static class javascript {
    
    public static final controllers.javascript.ReverseAppController AppController = new controllers.javascript.ReverseAppController(RoutesPrefix.byNamePrefix());
    public static final controllers.javascript.ReverseUserController UserController = new controllers.javascript.ReverseUserController(RoutesPrefix.byNamePrefix());
  }

}
