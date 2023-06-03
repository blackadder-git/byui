# Python


# Install Python
** On Windows, python gets installed as C:\\Windows\py.exe for all users or C:\Users\username\AppData\Local\Programs\Py

## Helpful Common Commands (cmd)
* py --version or python --version | to confirm installation and get version number
* python | puts you into the python environment >>>
* exit() | to leave the python >>>


# PIP

## Helpful Common Commands (cmd)
* pip list | to see installed packages
* python.exe -m pip install <package> | to install
* python.exe -m pip install <package==1.2> | to install a specific version
* python.exe -m pip install --upgrade <package> | update to the latest version
* python.exe -m pip uninstall <package>

# Virtual Environment
isolated area to run python

ctrl + shift + P | Python interpreter
.\venv\Scripts\python.exe




## Helpful Common Commands (cmd)
* py -m venv <name> | to create a virtual environment. include . in the name to hide it on the file system e.g. .cse310
* .cse310\Scripts\activate | to start up the virtual environment
* Visual Studio Code
** ctrl + shift + P | Python env ...

* Unless the terminal is showing (.venv), you´re not in the virtual environment
* To switch expand Scripts under .venv
* click Activate.ps1, you will be prompted to install a PowerShell extension if not already installed. Either way, the terminal environment should change to (.venv)
* Run pip list to see a minimum install with pip and setuptools
* Install more with: pip install <package_name>


# PROBLEMS
* Tried to upgrade Python but the system installed a new version instead. When I ran a script got "cannot be loaded because running scripts is disabled on this system"
* To fix, opened a PowerShell window as admin and typed "Set-ExecutionPolicy RemoteSigned" | "Y"
* Script then ran as expected

* Create a virtual environment
** 



# Links
** [Download](https://www.python.org/downloads/windows/)
** [Creation of virtual enviroments](https://docs.python.org/3/library/venv.html)
[Using Python environments](https://code.visualstudio.com/docs/python/environments)
** [Guide to Python Virtual Environment](https://www.youtube.com/watch?v=KxvKCSwlUv8)





