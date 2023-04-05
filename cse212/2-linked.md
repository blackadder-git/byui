# Linked Lists
## Introduction
Unlike other data structures which store their information in contiguous memory, a linked list stores its information as a series of nodes that can reside anywhere. Each node is linked together and forms a series or chain. The first node in the list is referred to as the "**head**" while the last node in the list is referred to as the "**tail**".

![image](images/linked.png)

While most linked lists are bi-directional like the one above, it is possible to have a linked list that goes in just one direction.

## Performance (Big O Notation)
The performance of a linked list depends on the action being taken. Because the size of a list makes no difference when adding a node to the beginning or ending the resulting performance is constant with a notation of O(1). When adding, removing or searching for a specific node in the list, the time required to reach the desired node increases linearly as the size of the list grows bigger. This results in a notation of O(n).

![image](images/bigo.png)

## Used For
* Linked lists are a good underlying data structure to implment a stack or a queue because they offer efficient insertion and removal of elements.
* Linked lists are also good for implementing structures that you know will grow and decrease in size over time.

## Disadvantages
Because nodes in a linked list hold data along with information linking them to other nodes, they have the potential to take up more space when compared with structures which only contain data. In addition, since getting from one node to another often means moving to a new space in memory, linked lists can´t take advantage of caching.

## Example: 
Although Python has its own version of a linked list implemented as a "**deque**", this example creates a linked list using a class within a class and functions.

```
# create a linked list class
class LinkedList:
    class Node:
        def __init__(self, data):
            # initialize new node
            self.data = data
            self.next = None
            self.prev = None

    def __init__(self):
        # initialize empty list
        self.head = None
        self.tail = None
```

When adding a node to the beginning of the list, the "**previous**" link of the former head is pointed back to the new node and the "**next**" link of the new head is pointed forward to the previous head. The "**previous**" link of the new head remains null.

```
    # add to beginning of list
    def insert_head(self, value):
        # add head node
        new_node = LinkedList.Node(value)  
        
        # if head is empty, set as new node
        if self.head is None:
            self.head = new_node
            self.tail = new_node
        else:
            # otherwise, point new node (next) to old head 
            new_node.next = self.head
            # point old head (prev) to new node
            self.head.prev = new_node
            # set new head
            self.head = new_node
```

When adding a node to the end of the list, the "**next**" link of the former tail is pointed forward to the new node and the "**previous**" link of the new tail is pointed back to the previuos node. The "**next**" link of the new tail remains null.

```
    # add to end of list
    def insert_tail(self, value):
        # add tail node
        new_node = LinkedList.Node(value)

        # if tail is empty, set as new node
        if self.tail is None:
            self.head = new_node
            self.tail = new_node
        else :
           # otherwise, point old tail (next) to new node
            self.tail.next = new_node
            # point new tail (prev) to old tail
            new_node.prev = self.tail
            # set new tail
            self.tail = new_node
```

Iterate over items in the list
```
    # iterate linked list
    def __iter__(self):
        curr = self.head  # Start at the begining since this is a forward iteration.
        while curr is not None:
            # store up values, return all at once
            yield curr.data
            # traverse list
            curr = curr.next
```

Write out items in the list
```
    # turn list into string
    def __str__(self):
        output = "["
        first = True
        for value in self:
            if first:
                first = False
            else:
                output += ", "
            output += str(value)
        output += "]"
        return output
```

Test out the list
```
# create list
linkedlist = LinkedList()
linkedlist.insert_head(1)
linkedlist.insert_tail(3)
print(linkedlist)
```

Output:
```
[1, 3]
```

## Problem to Solve: Head Bone Connected to ...

![image](images/aihead.webp)

Doctor Frankenstein wants Igor to prepare the anatomy he's collected for an upcoming experiment. Igor has the parts, unfortunately, they aren´t in the right order. Some are also unnecessary. He needs your help to remove the items that don´t belong and link the ones that do in the correct order.

+ Create a linked list with functions to remove and add items. Use the following list and order to seed your data structure.

```
+ head
+ brain
+ foot
+ back
+ ankle
+ bolts
+ hip
+ neck
+ leg
+ heart
+ knee
+ heel
+ thigh
+ chewing gum
+ toe
+ shoulder
```
 
+ **Hint:** The correct list and order of parts can be found in [Dem Bones](https://en.wikipedia.org/wiki/Dem_Bones)


[View Sample Solution](linked_solution.py)

[Back to Index](0-welcome.md)