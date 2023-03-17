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

pancake = stack()
pancake.push(1) # bottom
pancake.push(2) # middle
pancake.push(3) # top

# the first pancake added is the last one eaten
print("Eat pancake: " + str(pancake.pop()))
print("Eat pancake: " + str(pancake.pop()))
print("Eat pancake: " + str(pancake.pop()))
print("Eat pancake: " + str(pancake.pop()))
