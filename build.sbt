name := """play-angular2-typescript"""
version := "0.2.0-beta.6"
lazy val root = (project in file(".")).enablePlugins(PlayScala,PlayEbean,PlayJava)

scalaVersion := "2.11.7"
incOptions := incOptions.value.withNameHashing(true)
updateOptions := updateOptions.value.withCachedResolution(cachedResoluton = true)
JsEngineKeys.engineType := JsEngineKeys.EngineType.Node

//includeFilter in (Assets, LessKeys.less) := "foo.less" | "bar.less"
//
//LessKeys.compress in Assets := true
//
//includeFilter in (Assets, LessKeys.less) := "*.less"
//
//excludeFilter in (Assets, LessKeys.less) := "_*.less"
//LessKeys.compress := true

resolvers += Resolver.jcenterRepo

libraryDependencies ++= Seq( jdbc , cache , ws   , specs2 % Test )

libraryDependencies += jdbc

libraryDependencies += evolutions

libraryDependencies += "mysql" % "mysql-connector-java" % "5.1.36"

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )

resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"


libraryDependencies ++= {
  val ngVersion="2.2.0"
  Seq(
    cache,

    //angular2 dependencies
    "org.webjars.npm" % "angular__common" % ngVersion,
    "org.webjars.npm" % "angular__compiler" % ngVersion,
    "org.webjars.npm" % "angular__core" % ngVersion,
    "org.webjars.npm" % "angular__http" % ngVersion,
    "org.webjars.npm" % "angular__forms" % ngVersion,
    "org.webjars.npm" % "angular__router" % "3.2.0",
    "org.webjars.npm" % "angular__platform-browser-dynamic" % ngVersion,
    "org.webjars.npm" % "angular__platform-browser" % ngVersion,
    "org.webjars.npm" % "systemjs" % "0.19.40",
    "org.webjars.npm" % "rxjs" % "5.0.0-beta.12",
    "org.webjars.npm" % "reflect-metadata" % "0.1.8",
    "org.webjars.npm" % "zone.js" % "0.6.26",
    "org.webjars.npm" % "core-js" % "2.4.1",
    "org.webjars.npm" % "symbol-observable" % "1.0.1",

    "org.webjars.npm" % "typescript" % "2.2.1",

    //tslint dependency
    "org.webjars.npm" % "tslint-eslint-rules" % "3.4.0",
    "org.webjars.npm" % "tslint-microsoft-contrib" % "4.0.0",
    //   "org.webjars.npm" % "codelyzer" % "2.0.0-beta.1",
    "org.webjars.npm" % "types__jasmine" % "2.2.26-alpha" % "test"
    //test
    //  "org.webjars.npm" % "jasmine-core" % "2.4.1"
  )
}
dependencyOverrides += "org.webjars.npm" % "minimatch" % "3.0.0"

// use the webjars npm directory (target/web/node_modules ) for resolution of module imports of angular2/core etc
resolveFromWebjarsNodeModulesDir := true

// use the combined tslint and eslint rules plus ng2 lint rules
(rulesDirectories in tslint) := Some(List(
  tslintEslintRulesDir.value,
  ng2LintRulesDir.value
))

logLevel in tslint := Level.Debug
routesGenerator := InjectedRoutesGenerator

//libraryDependencies ++= Seq(
//  "org.webjars" % "less-node" % "2.5.0",
//  "org.webjars" % "source-map" % "0.1.40-1",
//  "org.webjars" % "mkdirp" % "0.5.0",
//  "org.webjars" % "clean-css" % "2.2.7",
//  "org.webjars" % "es6-promise-node" % "2.1.1"
//)

//addSbtJsEngine("1.1.2")
