# Overview

Kotlin is a cross-platform, statically typed, general purpose high-level programming language with type inference.

# Syntax 
* comments
** //
** /**/
* line terminating semicolons
** optional
* conventions
** packages
*** all lowercase, camel
** classes and objects
*** begin upper case, camel
*** if the primary constructor has more than "3" parameters, put them all on separate lines
** functions, properties, local variables
*** begin lower clase, camel, no underscores
** constants
*** UPPERCASE, snake
** [Coding Conventions](https://kotlinlang.org/docs/coding-conventions.html)
* val
** constant (imutable)
* var
** variable (mutable)
* packages and imports
** [doc](https://kotlinlang.org/docs/packages.html)
** declaration belongs at the to of the file
** using a package makes the contents there of part of the package namespace e.g. package **org.example** with a class of **Message** makes the full name of the class **org.example.Message**
** certain packages are imported by default including
*** kotlin.*
*** kotlin.annotation.*
*** kotlin.collections.*
*** kotlin.comparisons.*
*** kotlin.io.*
*** kotlin.ranges.*
*** kotlin.sequences.*
*** kotlin.text.*
** additional packages are imported depending on the target platform
*** JVM
*** JS
** imports can be done individually e.g. **org.example.Message**
** or as a wider include e.g. **org.example.***
** imports can be renamed with **as** to avoid a conflict e.g. **import org.example.Messaage as ExampleMessage**
* entry point
** main
** main(args: Array<String>)
* standard output
** print("Hello World")
** println("Hello World")
* functions
** ```
   fun sum(a: Int, b: Int): Int {
      return a + b
   }
   ```
* classes
** final by default, to inherit must be marked as open e.g. open class Shape

* string templates (interpolation)
* val b = "a is $a" // where a is defined earlier
* val c = "${s1.replace("this", "that"), all folks}" // like c#

* conditionals
** [doc](https://kotlinlang.org/docs/control-flow.html#if-expression)
** if/else
** when // like a switch
** for (item in collection)
** for (i in 1..10) // like a for loop
** while
** do/while
** break/continue
** is/!is // will check if type matches e.g. if(obj is String)

* map
** var increment = list.map { x -> x + 1 } // each item in the list is incremented by one

* filter
** var positives = list.filter { x -> x > 0 } // each item in list is passed to the filter as x, if the condition is met and x is greater than 0 it is returned and becomes part of positives

* reduce
** var sum = list.reduce {sum, int -> sum + int } // each value in the list is passed to the closure as int, the value is accumulated in sum and the end result is returned

* frequently used idioms
** [docs](https://kotlinlang.org/docs/idioms.html)

# Useful Websites

* [Wikipedia](https://en.wikipedia.org/wiki/Kotlin_(programming_language))
* [Kotlin](https://kotlinlang.org/)
* [Kotlin Playground](https://play.kotlinlang.org/byExample/01_introduction/01_Hello%20world)
* [Kotlin Core](https://hyperskill.org/tracks/18)
* [Developing Android Apps with Kotlin](https://www.udacity.com/course/developing-android-apps-with-kotlin--ud9012)
* [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)