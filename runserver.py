import os
import subprocess
import webbrowser
from threading import Timer

def open_browser():
    webbrowser.open_new("http://127.0.0.1:8000/controle/")

def activate_venv_and_runserver():
    activate_script = os.path.join('venv', 'Scripts', 'activate')
    command = f'cmd /k "{activate_script} && python CCF/manage.py runserver"'
    subprocess.run(command, shell=True)

if __name__ == "__main__":
    Timer(1, open_browser).start()
    activate_venv_and_runserver()
