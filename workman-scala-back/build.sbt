name := """play-scala-seed"""
organization := "com.example"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.8"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "4.0.3" % Test
libraryDependencies += "org.reactivemongo" %% "play2-reactivemongo" % "0.12.4"

play.sbt.routes.RoutesKeys.routesImport += 
"play.modules.reactivemongo.PathBindables._"