# Stacks
## Introduction
Stacks are characterized as *"**Last In, First Out**"* data structures. Items that are put or **pushed** onto the top or **back** of the stack can´t be removed until other more recent elements have been taken or **popped** off.

![image](images/stack.png)

## Performance (Big O Notation)
The performance of a stack depends on how it is implemented. 

If the underlying data structure uses an array or list to add and remove elements, it has O(n) notation.  As the size of the structure increases, performance degrades because more and more items need to be copied and moved. 

If on the other hand, the structure uses a linked list or it adds and removes items to the back, performance is constant with O(1) notation and will not decrease as the size of the structure increases.

## Used For
+ Functions that implement backtracking often use stacks to return to previous decision points thereby allowing a program to try alternate paths. 
+ Likewise, when a program has an undo function, it is most likely using a stack to track and revert changes back to some previous state.
## Common Errors
Stacks are susceptible to overflow if there is no longer space to contain more data. This can happen unintentionally when a recursive function calls itself too many times. It can also happen if the data given to a stack is too large.

## Example: 
In this example, a Python list is used to implement a stack that follows the principle of **"Last In, First Out"**. Although other implementations might use a deque or linked list instead, this example uses a list. Also, to improve performance, the stack adds and removes items from the end of the list and not the beginning.

```
# create a stack class
class stack:
  def __init__(self):
    # use a list to hold items
    self.__index = []

  # return number of items in the stack
  def __len__(self):
    return len(self.__index)

  # add item to the end of the stack
  def push(self,item):
    self.__index.append(item)

  # get item from the back of the stack
  def pop(self):
    if len(self) == 0:
       return "pop() called on empty stack."
    else:
        return self.__index.pop()

# instantiate a stack object
pancake = stack()

# add items
pancake.push(1) # bottom
pancake.push(2) # middle
pancake.push(3) # top

# remove items
# the first pancake added is the last one eaten
print("Eat: " + str(pancake.pop()))
print("Eat: " + str(pancake.pop()))
print("Eat: " + str(pancake.pop()))
print("Eat: " + str(pancake.pop()))
```
Output:\
Eat: 3\
Eat: 2\
Eat: 1\
Eat: pop() called on empty stack.

![image](images/pancakes.webp)

## Problem to Solve: Notes in Reverse

![image](images/igor.png)

While the good Doctor Frankenstein is away, trusty Igor has been tasked with transcribing his secret notes into something more readable. Always one to please, Igor needs your help to write a program that will solve this problem.

+ Use a stack to reverse the letters of the following message

```
efil fo kraps htiw erutaerc ezinavlaG .5\nrepap dekaos enirb htiw etarapes reppoc dna cniz fo setalp ytrof htiw sthguort eerht esu ,elip ciatlov dliuB .4\nefil fo stnemurtsni tcelloC .3\neussit dna snagro devreserp rehtegot hctitS .2\ndrayhcruhc sarcnaP .tS morf strap ydob yrassecen erucorP .1
```
 
+ **Hint:** to work correctly, try adding and removing each letter of the message to and from the stack on its own

[View Sample Solution](stack_solution.py)

[Back to Index](index.md)