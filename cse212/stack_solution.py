##################################################
# stack data structure
##################################################

# create a stack class
class stack:
  def __init__(self):
    # use a list to hold items
    self.__index = []

  # add item to the end of the stack
  def push(self,item):
    self.__index.append(item)

  # get item from the back of the stack
  def pop(self):
    if len(self) == 0:
       return "pop() called on empty stack."
    else:
        return self.__index.pop()

  # return number of items in the stack
  def __len__(self):
    return len(self.__index)


# instantiate a stack
notebook = stack()
notes = "efil fo kraps htiw erutaerc ezinavlaG .5\nrepap dekaos enirb htiw etarapes reppoc dna cniz fo setalp ytrof htiw sthguort eerht esu ,elip ciatlov dliuB .4\nefil fo stnemurtsni tcelloC .3\neussit dna snagro devreserp rehtegot hctitS .2\ndrayhcruhc sarcnaP .tS morf ymotana yrassecen erucorP .1"

# add each letter from the book
for letter in notes:
    notebook.push(letter)

# get each letter from the stack
for letter in range(len(notebook)):
    print(notebook.pop(), end=" ")

# correct output
# 1. Procure necessary anatomy from St. Pancras churchyard
# 2. Stitch together preserved organs and tissue
# 3. Collect instruments of life
# 4. Build voltaic pile, use three troughts with forty plates of zinc and copper separate with brine soaked paper
# 5. Galvanize creature with spark of life