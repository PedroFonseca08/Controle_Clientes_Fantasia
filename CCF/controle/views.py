from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import authenticate, login, logout as logout_django
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.urls import reverse
from django.contrib import messages
from django.http import JsonResponse
from .models import Cliente, Fantasia
from PIL import Image

@login_required(login_url="/controle/login")
def index(request):
    return render(request, 'index.html')  
    
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

def logout(request):
    logout_django(request)
    return render(request, 'login.html')

@login_required(login_url="/controle/login")
def clientes_view(request): 
    return render(request, 'clientes.html') 

@login_required(login_url="/controle/login")
def fantasias_view(request):
    if request.method == "GET":
        # Pego todas as minhas fantasias do BD e mando pra minha página:
        fantasias = Fantasia.objects.all().values()
        context = {
            'fantasias': fantasias
        }
        return render(request, 'fantasias.html', context)
    else: # Será por método POST

        nome = request.POST.get('nome_fantasia')
        qtdEstoque = request.POST.get('qtd_estoque')
        observacao = request.POST.get('observacao')
        file = request.FILES.get('img_fantasia')
        
        #Para manipular a imagem tem que usar o Pilow ?
        #img = Image.open(file)
        #img.resize(512, 640)

        fantasia = Fantasia(nome_fantasia=nome, estoque_fantasia=qtdEstoque, imagem_fantasia=file, observacao_fantasia=observacao)
        fantasia.save()

        return HttpResponseRedirect(reverse('fantasias')) 

@login_required(login_url="/controle/login")
def historico_view(request): 
    return render(request, 'historico.html')

@login_required(login_url="/controle/login")
def clientes(request):

    if request.method == 'POST':
        novo_cliente = Cliente(
            usuario=request.user,
            nome_cliente=request.POST.get('nome'),
            cpf_cliente=request.POST.get('cpf'),
            tel_cliente=request.POST.get('telefone'),
            rg_cliente=request.POST.get('rg'),
            cep_cliente=request.POST.get('cep'),
            end_cliente=request.POST.get('endereco'),
            data_nasc_cliente=request.POST.get('data_nasc') or None,
            observacao_cliente=request.POST.get('observacao'),
        )
        novo_cliente.save()
    
    clientes = Cliente.objects.all()

    context = {
        'clientes': clientes
    }

    return render(request, 'clientes.html', context)

@login_required(login_url="/controle/login")
def detalhes_cliente(request, id_cliente):
    try:
        cliente = Cliente.objects.get(pk=id_cliente)
        cliente_data = {
            'id': cliente.pk,
            'nome': cliente.nome_cliente,
            'cpf': cliente.cpf_cliente,
            'telefone': cliente.tel_cliente,
            'endereco': cliente.end_cliente,
            'rg': cliente.rg_cliente,
            'data_nasc': cliente.data_nasc_cliente.strftime('%Y-%m-%d') if cliente.data_nasc_cliente else None,
            'cep': cliente.cep_cliente,
            'observacao': cliente.observacao_cliente,
        }
        return JsonResponse(cliente_data)
    except Cliente.DoesNotExist:
        return JsonResponse({'error': 'Cliente não encontrado'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@login_required(login_url="/controle/login")
def editar_cliente(request, id_cliente):
    
    cliente = get_object_or_404(Cliente, pk=id_cliente)

    if request.method == 'POST':
        cliente.nome_cliente = request.POST.get('nome_edit')
        cliente.cpf_cliente = request.POST.get('cpf_edit')
        cliente.tel_cliente = request.POST.get('telefone_edit')
        cliente.rg_cliente = request.POST.get('rg_edit')
        cliente.cep_cliente = request.POST.get('cep_edit')
        cliente.end_cliente = request.POST.get('endereco_edit')
        cliente.data_nasc_cliente = request.POST.get('data_nasc_edit') or None
        cliente.observacao_cliente = request.POST.get('observacao_edit')

        cliente.save()
    
    clientes = Cliente.objects.all()

    context = {
        'clientes': clientes
    }

    return render(request, 'clientes.html', context)
