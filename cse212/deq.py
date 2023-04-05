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

    # iterate linked list
    def __iter__(self):
        curr = self.head  # start at the beginning since this is a forward iteration
        while curr is not None:
            # store up values, return all at once
            yield curr.data
            # traverse list
            curr = curr.next    

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


linkedlist = LinkedList()
linkedlist.insert_head(1)
linkedlist.insert_tail(3)
print(linkedlist)




import collections

linkedlist = collections.deque([1, 2, 4])
print(linkedlist)

# to the back
linkedlist.append(5)
print(linkedlist)

# to the front 
linkedlist.appendleft(0)
print(linkedlist)

# after an existing value
linkedlist.insert(3, 3)
print(linkedlist)

# from the back
linkedlist.pop()
print(linkedlist)

# from the front
linkedlist.popleft()
print(linkedlist)

# remove existing value
linkedlist.remove(4)
print(linkedlist)

