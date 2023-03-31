##################################################
# linked list structure
##################################################

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

    # insert node after matching value
    def insert_after(self, value, new_value):
        # search list for match, insert after if found
        curr = self.head
        while curr is not None:
            if curr.data == value:
                # match at end, insert new tail
                if curr == self.tail:
                    self.insert_tail(new_value)
                else:
                    # create new node
                    new_node = LinkedList.Node(new_value)
                    # point new node to previous node
                    new_node.prev = curr
                    # point new node to next node
                    new_node.next = curr.next
                    # point 
                    curr.next.prev = new_node
                    # point next node back to the new node
                    curr.next = new_node
                # return after adding node
                return
            curr = curr.next # Go to the next node to search for 'value'

    # remove matching node
    def remove(self, value):
        curr = self.head
        while curr is not None:
            if curr.data == value:
                # if the node is the head, remove the first item in the list
                if curr == self.head:
                    self.remove_head()
                # if the node is the tail, remove the last item in the list
                elif curr == self.tail:
                    self.remove_tail()
                else :
                    # change 
                    # set the previous node to point to the next node (and skip the current node)
                    curr.prev.next = curr.next
                    # set the next node to point to the previous node (and skip the current node)
                    curr.next.prev = curr.prev
                # the node was removed
                return
            curr = curr.next # Go to the next node to search for 'value'

    # remove head
    def remove_head(self):
        # only one node
        if self.head == self.tail:
            self.head = None
            self.tail = None
        # reset head
        elif self.head is not None:
            # remove link back to head, be free
            self.head.next.prev = None 
            # set new head
            self.head = self.head.next 

    # remove tail
    def remove_tail(self):
        # only one node
        if self.head == self.tail:
            self.head = None
            self.tail = None
        # reset tail
        elif self.tail is not None:
            # remove link to former tail node, be free
            self.tail.prev.next = None
            # set new tail
            self.tail = self.tail.prev

    # iterate linked list
    def __iter__(self):
        curr = self.head  # Start at the begining since this is a forward iteration.
        while curr is not None:
            # store up values, return all at once
            yield curr.data
            # traverse list
            curr = curr.next

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


# create list
linkedlist = LinkedList()
linkedlist.insert_head(1)
linkedlist.insert_tail(3)
linkedlist.insert_after(1, 2)
print(linkedlist) # linkedlist[1, 2, 3]

linkedlist.insert_head(0)
linkedlist.insert_tail(4)
print(linkedlist) # linkedlist[0, 1, 2, 3, 4]

linkedlist.insert_after(3, 9)
print(linkedlist) # linkedlist[0, 1, 2, 3, 9, 4]

linkedlist.remove(0)
linkedlist.remove(2)
linkedlist.remove(4)
print(linkedlist) # linkedlist[1, 3, 9]