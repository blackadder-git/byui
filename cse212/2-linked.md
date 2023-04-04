# Linked Lists
## Introduction
Unlike other data structures which store their information in contiguous memory, a linked list stores its information as a series of nodes that can reside anywhere. Each node is linked together to for a series or a chain. The first node in the list is referred to as the "**head**" while the last node in the list is referred to as the "**tail**".

![image](images/linked.png)

*While most linked lists are bi-directional like the image above, it is possible to have a linked list that goes in just one direction.

## Performance (Big O Notation)
The performance of a linked list depends on the action being taken. The size of a list makes no difference when adding a node to the beginning or ending. This results in a big O notation of O(1). When adding, removing or searching for for a specific node in the list, the time required to reach the desired node increases linearly as the size of the list grows bigger. This results in a notation of O(n).

![image](images/bigo.png)

## Used For
* Linked lists are a good underlying data structure to implment a stack or a queue because they offer efficient insertion and removal of elements.
* 

## Disadvantages
Because linked lists hold data along with information to reach the next node, they have the potential to take more space to implement. In addition, since getting from one node to another often means moving to a new location in memory, linked lists can´t take advantage of caching.

## Example: 
TODO: describe example

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

When adding a node to the beginning of the list, the previous link of the former head is pointed forward to the new node and the next link of the new head is pointed to the previuos head. The previous link of the new head remains null.

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

When adding a node to the end of the list, the next link of the former tail is pointed back to the new node and the previous link of the new tail is pointed back to the previuos node. The next link of the new tail remains null.

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

Go through list
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

Write out list
```
    # turn list into string
    def __str__(self):
        output = "linkedlist["
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
linkedlist[1, 3]
```

## Problem to Solve: Head Bone Connected to ...

![image](images/igor.png)

TODO: set the stage

+ Use a linked list to [add description]

```
TODO: add data
```
 
+ **Hint:** 

[View Sample Solution](stack_solution.py)

[Back to Index](0-welcome.md)