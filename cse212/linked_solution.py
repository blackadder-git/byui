##################################################
# SAMPLE SOLUTION: linked list
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

    # When adding a node to the beginning of the list, the "**previous**" link of the 
    # former head is pointed back to the new node and the "**next**" link of the new 
    # head is pointed forward to the previous head. The "**previous**" link of the new 
    # head remains null.

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


# create list
linkedlist = LinkedList()
linkedlist.insert_head("head")
linkedlist.insert_head("brain")
linkedlist.insert_head("foot")
linkedlist.insert_head("back")
linkedlist.insert_head("ankle")
linkedlist.insert_head("bolts")
linkedlist.insert_head("hip")
linkedlist.insert_head("neck")
linkedlist.insert_head("leg")
linkedlist.insert_head("heart")
linkedlist.insert_head("knee")
linkedlist.insert_head("heel")
linkedlist.insert_head("thigh")
linkedlist.insert_head("chewing gum")
linkedlist.insert_head("toe")
linkedlist.insert_head("shoulder")

# remove extra parts
linkedlist.remove("brain")
linkedlist.remove("bolts")
linkedlist.remove("heart")
linkedlist.remove("chewing gum")

# remove existing parts / add them in proper order
linkedlist.remove("neck")
linkedlist.insert_after("head", "neck")
linkedlist.remove("shoulder")
linkedlist.insert_after("neck", "shoulder")
linkedlist.remove("back")
linkedlist.insert_after("shoulder", "back")
linkedlist.remove("hip")
linkedlist.insert_after("back", "hip")
linkedlist.remove("thigh")
linkedlist.insert_after("hip", "thigh")
linkedlist.remove("knee")
linkedlist.insert_after("thigh", "knee")
linkedlist.remove("leg")
linkedlist.insert_after("knee", "leg")
linkedlist.remove("ankle")
linkedlist.insert_after("leg", "ankle")
linkedlist.remove("heel")
linkedlist.insert_after("ankle", "heel")
linkedlist.remove("foot")
linkedlist.insert_after("heel", "foot")
linkedlist.remove("toe")
linkedlist.insert_after("foot", "toe")

print(linkedlist)

# correct output
# [head, neck, shoulder, back, hip, thigh, knee, leg, ankle, heel, foot, toe]