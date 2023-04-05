##################################################
# SAMPLE SOLUTION: Lightening in a Bottle
##################################################
from datetime import datetime

# create a binary tree class
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
      # print("add root: " + str(data))
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
        # print("add left: " + str(data))
        node.left = Tree.Node(data)
      else:
        # keep looking
        self._insert(data, node.left)
    else:
      if node.right is None:
        # empty, create new node
        # print("add right: " + str(data))
        node.right = Tree.Node(data)
      else:
        # keep looking
        self._insert(data, node.right)

  def __contains__(self, date_as_timestamp):
    # convert date to timestamp
    date_as_string = (datetime.strptime(date_as_timestamp, '%Y-%m-%d') - datetime(1970, 1, 1)).total_seconds()
    return self._contains(date_as_string, self.root)  # Start at the root

  def _contains(self, data, node):
    if data == node.data:
      return True
    elif data < node.data:
      # data belongs on the left side
      if node.left is not None:
        # keep looking, make recursive call on the left sub-tree
        return self._contains(data, node.left)
    else:
      # data belongs on the right side
      if node.right is not None:
        # keep looking, make recursive call on the right sub-tree
        return self._contains(data, node.right)

    # value was never found
    return False

# instantiate a binary tree
lightening = Tree()

# add lightening strikes to tree
lightening.insert(-4846176000.0)
lightening.insert(-4828204800.0)
lightening.insert(-4859395200.0)
lightening.insert(-4822502400.0)
lightening.insert(-4888598400.0)
lightening.insert(-5356195200.0)
lightening.insert(-4773600000.0)

# did lightening strike these days ?
print('1800-04-09' in lightening)
print('1806-06-22' in lightening)

# correct output
# True
# False