// @GENERATOR:play-routes-compiler
// @SOURCE:/mnt/c/Users/Joni/devel/WorkMan/workman-scala-back/conf/routes
// @DATE:Sat Nov 16 15:45:49 EET 2019


package router {
  object RoutesPrefix {
    private var _prefix: String = "/"
    def setPrefix(p: String): Unit = {
      _prefix = p
    }
    def prefix: String = _prefix
    val byNamePrefix: Function0[String] = { () => prefix }
  }
}
