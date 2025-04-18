"use client"

import { useState } from "react"

const flashcards = [
  {
    question: "What is the difference between var, let, and const?",
    answer:
      "In JavaScript, var is function-scoped and can be re-declared; let and const are block-scoped, with let allowing re-assignment and const preventing it. However, const objects can have their contents modified.",
  },
  {
    question: "What is closure in JavaScript?",
    answer:
      "A closure is a function that has access to its own scope, the outer function's variables, and global variables even after the outer function has returned.",
  },
  {
    question: "What is the event loop in JavaScript?",
    answer:
      "The event loop is a mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded. It monitors the call stack and callback queue, pushing callbacks to the stack when it's empty.",
  },
  {
    question: "What is the difference between == and === in JavaScript?",
    answer:
      "== is the equality operator that compares value after type conversion, while === is the strict equality operator that compares both value and type without conversion.",
  },
  {
    question: "What are Promises in JavaScript?",
    answer:
      "Promises are objects representing the eventual completion or failure of an asynchronous operation. They allow you to chain .then() and .catch() methods to handle success and error cases respectively.",
  },
  {
    question: "What is the purpose of the 'this' keyword in JavaScript?",
    answer:
      "The 'this' keyword refers to the object it belongs to. In a method, 'this' refers to the owner object. In a function, 'this' refers to the global object (or undefined in strict mode). In an event, 'this' refers to the element that received the event.",
  },
  {
    question: "What is the difference between null and undefined?",
    answer:
      "undefined means a variable has been declared but not assigned a value, while null is an assignment value representing no value or no object. undefined is a type itself, while null is an object.",
  },
  {
    question: "What is hoisting in JavaScript?",
    answer:
      "Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope. Function declarations are hoisted completely, while variable declarations (but not initializations) are hoisted.",
  },
  {
    question: "What is the DOM?",
    answer:
      "The Document Object Model (DOM) is a programming interface for web documents. It represents the page as nodes and objects that can be manipulated with JavaScript.",
  },
  {
    question: "What is the difference between map() and forEach()?",
    answer:
      "map() creates a new array with the results of calling a function on every element in the calling array, while forEach() executes a provided function once for each array element but doesn't return anything.",
  },
  {
    question: "What is async/await in JavaScript?",
    answer:
      "async/await is syntactic sugar built on top of Promises, making asynchronous code look and behave more like synchronous code. An async function returns a Promise, and the await keyword pauses execution until a Promise is resolved.",
  },
  {
    question: "What is the spread operator (...) in JavaScript?",
    answer:
      "The spread operator (...) allows an iterable (like an array or string) to be expanded in places where zero or more arguments/elements are expected, or an object to be expanded in places where zero or more key-value pairs are expected.",
  },
  {
    question: "What is destructuring in JavaScript?",
    answer:
      "Destructuring is a JavaScript expression that allows you to extract data from arrays or objects into distinct variables, using a syntax that mirrors the construction of array and object literals.",
  },
  {
    question: "What is a callback function?",
    answer:
      "A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.",
  },
  {
    question: "What is the difference between localStorage and sessionStorage?",
    answer:
      "Both store data in key-value pairs, but localStorage data has no expiration time, while sessionStorage data gets cleared when the page session ends (when the tab is closed).",
  },
  {
    question: "What is a pure function?",
    answer:
      "A pure function is a function that, given the same input, will always return the same output and has no side effects (doesn't modify any external state).",
  },
  {
    question: "What is the difference between arrow functions and regular functions?",
    answer:
      "Arrow functions don't have their own 'this' binding (it's taken from the enclosing scope), don't have arguments object, can't be used as constructors, and can't be used as methods. They also have a more concise syntax.",
  },
  {
    question: "What is a RESTful API?",
    answer:
      "A RESTful API is an architectural style for an API that uses HTTP requests to access and use data. It uses HTTP methods like GET, POST, PUT, and DELETE to perform CRUD operations on resources identified by URLs.",
  },
  {
    question: "What is the purpose of JSON.stringify() and JSON.parse()?",
    answer:
      "JSON.stringify() converts a JavaScript object into a JSON string, while JSON.parse() converts a JSON string into a JavaScript object.",
  },
  {
    question: "What is the difference between synchronous and asynchronous code?",
    answer:
      "Synchronous code executes line by line, blocking further execution until the current operation completes. Asynchronous code allows operations to run in the background without blocking the main thread, using callbacks, promises, or async/await to handle results.",
  },
]

// Update the totalCards variable to match the actual number of flashcards
const totalCards = flashcards.length

export default function FlashCardsApp() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const progressPercent = ((currentIndex + 1) / totalCards) * 100

  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowAnswer(false)
    }
  }

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white">
      <div className="w-full max-w-2xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-black">Flash Cards</h1>

        {/* Progress Bar Container */}
        <div className="border border-gray-300 rounded-full p-1 mb-4 flex items-center justify-between">
          <div className="flex items-center flex-1">
            <div className="bg-gray-300 rounded-full h-6 overflow-hidden flex-1 mr-2">
              <div className="bg-gray-400 h-6" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <span className="text-black font-medium">{Math.round(progressPercent)}%</span>
          </div>
          <span className="text-black font-medium ml-4">
            {currentIndex + 1} of {totalCards}
          </span>
        </div>

        {/* Card */}
        <div className="border border-gray-300 rounded-lg p-8 mb-6 text-center bg-gray-100 min-h-[240px] flex items-center justify-center">
          <p className="text-2xl font-medium text-center text-black">
            {showAnswer ? flashcards[currentIndex].answer : flashcards[currentIndex].question}
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center border border-gray-300 rounded-lg p-3">
          <button
            onClick={handlePrevious}
            className="px-4 py-2 text-gray-700 font-medium flex items-center"
            disabled={currentIndex === 0}
          >
            <span className="mr-1">&#8249;</span> Previous
          </button>

          <button
            onClick={toggleAnswer}
            className="px-6 py-2 rounded-md bg-white text-black font-medium border border-gray-300"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-2 text-gray-700 font-medium flex items-center"
            disabled={currentIndex === totalCards - 1}
          >
            Next <span className="ml-1">&#8250;</span>
          </button>
        </div>
      </div>
    </div>
  )
}
