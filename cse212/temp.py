# https://blog.boot.dev/computer-science/binary-search-tree-in-python/

from datetime import datetime
strike1 = (datetime.strptime('1816-06-07', '%Y-%m-%d') - datetime(1970, 1, 1)).total_seconds()
strike2 = (datetime.strptime('1817-01-01', '%Y-%m-%d') - datetime(1970, 1, 1)).total_seconds()
strike3 = (datetime.strptime('1816-01-06', '%Y-%m-%d') - datetime(1970, 1, 1)).total_seconds()
strike4 = (datetime.strptime('1817-03-08', '%Y-%m-%d') - datetime(1970, 1, 1)).total_seconds()
strike5 = (datetime.strptime('1815-02-02', '%Y-%m-%d') - datetime(1970, 1, 1)).total_seconds()
strike6 = (datetime.strptime('1800-04-09', '%Y-%m-%d') - datetime(1970, 1, 1)).total_seconds()
strike7 = (datetime.strptime('1818-09-25', '%Y-%m-%d') - datetime(1970, 1, 1)).total_seconds()
strike8 = (datetime.strptime('1818-11-25', '%Y-%m-%d') - datetime(1970, 1, 1)).total_seconds()

from datetime import timedelta
current = datetime(1970, 1, 1) + timedelta(seconds=-5356195200.0)

# print the datetime object and its type
print("dt_object =", current)

class Tree:

  class Node:
    # initialize root node
    def __init__(self, data):
      # use a list to hold items
      self.data = data
      self.left = None
      self.right = None

  # initialize empty tree
  def __init__(self):
    self.root = None     

  # add information to the tree
  def insert(self, data):
    if self.root is None:
      print("add root: " + str(data))
      self.root = Tree.Node(data)
    else:
      self._insert(data, self.root) # start at the root
  
  # add node
  def _insert(self, data, node):
    # no duplicates
    if data == node.data:
      return False
    elif data < node.data:
      if node.left is None:
        # empty, create new node
        print("add left: " + str(data))
        node.left = Tree.Node(data)
      else:
        # keep looking
        self._insert(data, node.left)
    else:
      if node.right is None:
        # empty, create new node
        print("add right: " + str(data))
        node.right = Tree.Node(data)
      else:
        # keep looking
        self._insert(data, node.right)

  def __contains__(self, data):
    return self._contains(data, self.root)  # Start at the root

  def _contains(self, data, node):
    if data == node.data:
      return True
    elif data < node.data:
      # The data belongs on the left side.
      if node.left is not None:
        # Need to keep looking.  Call _contains
        # recursively on the left sub-tree.
        return self._contains(data, node.left)
    else:
      # The data belongs on the right side.
      if node.right is not None:
        # Need to keep looking.  Call _contains
        # recursively on the right sub-tree.
        return self._contains(data, node.right)

    # value was never found
    return False

# instantiate a binary tree
numbers = Tree()

# add items
numbers.insert(1)
numbers.insert(7)
numbers.insert(4)
numbers.insert(6)
numbers.insert(5)
numbers.insert(3)
numbers.insert(2)

print(0 in numbers)
print(2 in numbers)
print(9 in numbers)
