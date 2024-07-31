from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import authenticate, login, logout as logout_django
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.urls import reverse
from django.contrib import messages
from django.http import JsonResponse
from .models import Cliente, ClienteFantasia, Fantasia, Tipo
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
        # Quando eu passo os objetos em si para o template, consigo acessar os atributos da tabela da chave estrangeira.
        # Existe outra forma de fazer isso? Era pra ser assim mesmo?
        sessao = request.user
        
        fantasias = Fantasia.objects.filter(usuario=sessao)
        tipos = Tipo.objects.all()
        context = {
            'fantasias': fantasias,
            'tipos': tipos
        }
        return render(request, 'fantasias.html', context)
    else: # Será por método POST

        user = request.user
        nome = request.POST.get('nome_fantasia')
        preco_aluguel = request.POST.get('preco_aluguel')
        preco_venda = request.POST.get('preco_venda')
        tipo_fantasia_id = request.POST.get('tipo_fantasia')
        tipo_fantasia = get_object_or_404(Tipo, pk=tipo_fantasia_id)

        #file = request.FILES.get('img_fantasia')
        #Para manipular a imagem tem que usar o Pilow ?
        #img = Image.open(file)
        #img.resize(512, 640)
        #Fantasia(imagem_fantasia=file)

        fantasia = Fantasia(usuario=user, nome_fantasia=nome, tipo_fantasia=tipo_fantasia, preco_venda=preco_venda, preco_aluguel=preco_aluguel)
        fantasia.save()

        return HttpResponseRedirect(reverse('fantasias'))
    
@login_required(login_url="/controle/login")
def detalhes_fantasia(request, id_fantasia):
    try:
        fantasia = get_object_or_404(Fantasia, pk=id_fantasia)
        fantasia_data = {
            'nome_fantasia': fantasia.nome_fantasia,
            'tipo_fantasia': fantasia.tipo_fantasia.id, #estou usando o id do tipo como valor de referência no html
            'preco_venda': fantasia.preco_venda,
            'preco_aluguel': fantasia.preco_aluguel,
        }
        return JsonResponse(fantasia_data)
    except Cliente.DoesNotExist:
        return JsonResponse({'error': 'Fantasia não encontrada'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
@login_required(login_url="/controle/login")
def editar_fantasia(request, id_fantasia):

    fantasia = get_object_or_404(Fantasia, pk=id_fantasia)

    if request.method == 'POST':
        idTipo = request.POST.get('tipo_fantasia_edit')

        tipoFantasia = get_object_or_404(Tipo, pk=idTipo)

        fantasia.nome_fantasia = request.POST.get('nome_fantasia_edit')
        fantasia.tipo_fantasia = tipoFantasia
        fantasia.preco_aluguel = request.POST.get('preco_aluguel_edit')
        fantasia.preco_venda = request.POST.get('preco_venda_edit')

        fantasia.save()
    
    sessao = request.user
        
    fantasias = Fantasia.objects.filter(usuario=sessao)
    tipos = Tipo.objects.all()

    context = {
        'fantasias' : fantasias,
        'tipos' : tipos,
    }

    return render(request, 'fantasias.html', context)

@login_required(login_url="/controle/login")
def deletar_fantasia(request, id_fantasia):
    
    fantasia = get_object_or_404(Fantasia, pk=id_fantasia)

    fantasia.delete()
    
    sessao = request.user
        
    fantasias = Fantasia.objects.filter(usuario=sessao)

    context = {
        'fantasias': fantasias
    }

    return render(request, 'fantasias.html', context)


@login_required(login_url="/controle/login")
def clientes(request):

    sessao = request.user

    if request.method == 'POST':
        novo_cliente = Cliente(
            usuario=sessao,
            nome_cliente=request.POST.get('nome'),
            cpf_cliente=request.POST.get('cpf'),
            tel_cliente=request.POST.get('telefone'),
            tel2_cliente=request.POST.get('telefone2'),
            cep_cliente=request.POST.get('cep'),
            logradouro_cliente=request.POST.get('logradouro'),
            num_logradouro=request.POST.get('num_logradouro'),
            complemento_logradouro=request.POST.get('complemento_logradouro'),
            bairro_logradouro=request.POST.get('bairro_logradouro'),
            uf_logradouro=request.POST.get('uf_logradouro'),
            municipio_logradouro=request.POST.get('municipio_logradouro'), 
            data_nasc_cliente=request.POST.get('data_nasc') or None,
            email_cliente=request.POST.get('email'),
            observacao_cliente=request.POST.get('observacao'),
        )

        novo_cliente.save()

        return redirect('clientes')

    clientes = Cliente.objects.filter(usuario=sessao)
    fantasias = Fantasia.objects.filter(usuario=sessao)

    context = {
        'clientes': clientes,
        'fantasias': fantasias,
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
            'telefone2': cliente.tel2_cliente,
            'logradouro': cliente.logradouro_cliente,
            'num_logradouro': cliente.num_logradouro,
            'complemento_logradouro': cliente.complemento_logradouro,
            'bairro_logradouro': cliente.bairro_logradouro,
            'uf_logradouro': cliente.uf_logradouro,
            'municipio_logradouro': cliente.municipio_logradouro,
            'data_nasc': cliente.data_nasc_cliente.strftime('%Y-%m-%d') if cliente.data_nasc_cliente else None,
            'cep': cliente.cep_cliente,
            'email': cliente.email_cliente,
            'observacao': cliente.observacao_cliente,
        }
        return JsonResponse(cliente_data)
    except Cliente.DoesNotExist:
        return JsonResponse({'error': 'Cliente não encontrado'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@login_required(login_url="/controle/login")
def editar_cliente(request, id_cliente):
    
    sessao = request.user

    cliente = get_object_or_404(Cliente, pk=id_cliente)

    if request.method == 'POST':
        cliente.nome_cliente = request.POST.get('nome_edit')
        cliente.cpf_cliente = request.POST.get('cpf_edit')
        cliente.tel_cliente = request.POST.get('telefone_edit')
        cliente.tel2_cliente = request.POST.get('telefone2_edit')
        cliente.cep_cliente = request.POST.get('cep_edit')
        cliente.logradouro_cliente = request.POST.get('logradouro_edit')
        cliente.num_logradouro = request.POST.get('num_logradouro_edit')
        cliente.complemento_logradouro = request.POST.get('complemento_logradouro_edit')
        cliente.bairro_logradouro = request.POST.get('bairro_logradouro_edit')
        cliente.uf_logradouro = request.POST.get('uf_logradouro_edit')
        cliente.municipio_logradouro = request.POST.get('municipio_logradouro_edit')
        cliente.data_nasc_cliente = request.POST.get('data_nasc_edit') or None
        cliente.email_cliente = request.POST.get('email_edit')
        cliente.observacao_cliente = request.POST.get('observacao_edit')

        cliente.save()
    
    clientes = Cliente.objects.filter(usuario=sessao)

    context = {
        'clientes': clientes
    }

    return render(request, 'clientes.html', context)


@login_required(login_url="/controle/login")
def historico_view(request):
    
    sessao = request.user

    clientesFantasia = ClienteFantasia.objects.filter(cliente__usuario = sessao)
    
    context = {
        'historico': clientesFantasia
    }

    return render(request, 'historico.html', context)

@login_required(login_url="/controle/login")
def detalhes_fantasia_cliente(request, id_cliente_fantasia):
    try:
        cliente_fantasia = get_object_or_404(ClienteFantasia, pk=id_cliente_fantasia)
        cliente_fantasia_data = {
            'nome': cliente_fantasia.cliente.nome_cliente,
            # TO DO
            'nome_fantasia': cliente_fantasia.fantasia.nome_fantasia,
            'preco_fantasia': cliente_fantasia.preco_fantasia,
            'tipo_transacao': cliente_fantasia.tipo_transacao,
            'data_inicio_fantasia': cliente_fantasia.data_inicio_fantasia,
            'data_fim_fantasia': cliente_fantasia.data_fim_fantasia.strftime('%Y-%m-%d') if cliente_fantasia.data_fim_fantasia else None,
        }
        return JsonResponse(cliente_fantasia_data)
    except Cliente.DoesNotExist:
        return JsonResponse({'error': 'Cliente Fantasia não encontrado'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
@login_required(login_url="/controle/login")
def editar_fantasia_cliente(request, id_cliente_fantasia):

    cliente_fantasia = get_object_or_404(ClienteFantasia, pk=id_cliente_fantasia)

    if request.method == 'POST':
        cliente_fantasia.fantasia = request.POST.get('fantasia')
        cliente_fantasia.preco_fantasia = request.POST.get('preco_fantasia')
        cliente_fantasia.tipo_transacao = request.POST.get('tipo_transacao')
        cliente_fantasia.data_inicio_fantasia = request.POST.get('data_inicio_fantasia')
        if cliente_fantasia.tipo_transacao == 'A':
            cliente_fantasia.data_fim_fantasia = request.POST.get('data_fim_fantasia')
        else:
            cliente_fantasia.data_fim_fantasia = None

        cliente_fantasia.save()
    
    sessao = request.user

    clientesFantasia = ClienteFantasia.objects.filter(cliente__usuario = sessao)

    context = {
        'historico': clientesFantasia
    }

    return render(request, 'historico.html', context)

@login_required(login_url="/controle/login")
def deletar_cliente(request, id_cliente):
    
    sessao = request.user;

    cliente = get_object_or_404(Cliente, pk=id_cliente)

    cliente.delete()
    
    clientes = Cliente.objects.filter(usuario=sessao)

    context = {
        'clientes': clientes
    }

    return render(request, 'clientes.html', context)

@login_required(login_url="/controle/login")
def deletar_fantasia_cliente(request, id_cliente_fantasia):
    
    cliente_fantasia = get_object_or_404(ClienteFantasia, pk=id_cliente_fantasia)

    cliente_fantasia.delete()
    
    sessao = request.user

    clientesFantasia = ClienteFantasia.objects.filter(cliente__usuario = sessao)

    context = {
        'historico': clientesFantasia
    }

    return render(request, 'historico.html', context)


@login_required(login_url="/controle/login")
def historico(request, id_cliente):
    cliente = get_object_or_404(Cliente, pk=id_cliente)

    if request.method == 'POST':
        fantasia = get_object_or_404(Fantasia, pk=request.POST.get('fantasia'))
        preco_fantasia = request.POST.get('preco_fantasia')
        tipo_transacao = request.POST.get('tipo_transacao')
        data_inicio_fantasia = request.POST.get('data_inicio_fantasia')
        
        if tipo_transacao == 'A':
            data_fim_fantasia = request.POST.get('data_fim_fantasia')
        else:
            data_fim_fantasia = None
        
        novo_cliente_fantasia = ClienteFantasia(
            cliente=cliente,
            fantasia=fantasia,
            preco_fantasia=preco_fantasia,
            tipo_transacao=tipo_transacao,
            data_inicio_fantasia=data_inicio_fantasia,
            data_fim_fantasia=data_fim_fantasia,
            baixa_fantasia='S',
        )
        novo_cliente_fantasia.save()

    sessao = request.user

    cliente_fantasias = ClienteFantasia.objects.filter(cliente__usuario = sessao)

    cliente_fantasias_data = list(cliente_fantasias.values())

    return JsonResponse(cliente_fantasias_data, safe=False)


@login_required(login_url="/controle/login")
def fantasias_cliente(request, id_cliente):

    sessao = request.user

    transacoes = ClienteFantasia.objects.filter(cliente__usuario = sessao, cliente__id = id_cliente)

    cliente = Cliente.objects.get(pk=id_cliente)

    fantasias = Fantasia.objects.filter(usuario=sessao)

    context = {
        'transacoes': transacoes,
        'cliente': cliente,
        'fantasias': fantasias,
    }

    return render(request, 'fantasias_cliente.html', context)