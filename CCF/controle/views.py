from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.contrib import messages

def index(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return render(request, 'index.html')  
        return render(request, 'login.html') 
    
def login_view(request):
    print(10)
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)

        if user:
            login(request, user)
            return HttpResponseRedirect(reverse('index'))  
        else:
            messages.info(request, 'Nome de usuário ou senha incorreta!')

    return render(request, 'login.html')  


def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        username = request.POST.get('username')
        password = request.POST.get('password')
        if username and password:
            user = User.objects.filter(username = username).first()
            
            if user:
                messages.info(request, 'Nome de usuário já existe!')
                return render(request, 'register.html', {'form': form})
            
            user = User.objects.create_user(username=username, password=password) 
            user.save
            login(request, user)  
            return HttpResponseRedirect(reverse('index')) 
    else:
        form = UserCreationForm()

    return render(request, 'register.html', {'form': form})