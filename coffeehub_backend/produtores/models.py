from django.db import models

# Modelo que representa um produtor rural
class Produtor(models.Model):
    SEXO_CHOICES = [
        ('Masculino', 'Masculino'),
        ('Feminino', 'Feminino'),
        ('Outro', 'Outro'),
    ]
    STATUS_CHOICES = [
        ('Ativo', 'Ativo'),
        ('Inativo', 'Inativo'),
    ]

    nome = models.CharField(max_length=255, verbose_name="Nome Completo")  # Nome completo do produtor
    codigo = models.CharField(max_length=50, unique=True, verbose_name="Código do Produtor")  # Código único do produtor
    data_cadastro = models.DateTimeField(auto_now_add=True, verbose_name="Data de Cadastro")  # Data de cadastro automático
    data_nascimento = models.DateField(null=True, blank=True, verbose_name="Data de Nascimento")  # Data de nascimento do produtor
    telefone = models.CharField(max_length=20, null=True, blank=True, verbose_name="Telefone")  # Telefone para contato
    email = models.EmailField(max_length=255, unique=True, verbose_name="E-mail")  # E-mail único do produtor
    identificacao = models.CharField(max_length=14, unique=True, verbose_name="CPF/CNPJ")  # CPF ou CNPJ do produtor
    sexo = models.CharField(max_length=10, choices=SEXO_CHOICES, null=True, blank=True, verbose_name="Sexo")  # Sexo do produtor
    endereco_rua = models.CharField(max_length=255, null=True, blank=True, verbose_name="Rua")  # Rua do endereço
    endereco_numero = models.CharField(max_length=10, null=True, blank=True, verbose_name="Número")  # Número do endereço
    endereco_bairro = models.CharField(max_length=100, null=True, blank=True, verbose_name="Bairro")  # Bairro do endereço
    endereco_municipio = models.CharField(max_length=100, null=True, blank=True, verbose_name="Município")  # Município do endereço
    endereco_estado = models.CharField(max_length=2, null=True, blank=True, verbose_name="Estado (UF)")  # Estado do endereço
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Ativo', verbose_name="Status")  # Status do produtor

    class Meta:
        verbose_name = "Produtor"
        verbose_name_plural = "Produtores"

    def __str__(self):
        return self.nome

# Modelo que representa uma propriedade rural vinculada a um produtor
class Propriedade(models.Model):
    produtor = models.ForeignKey(
        Produtor, on_delete=models.CASCADE, related_name='propriedades'  # Relação com o produtor
    )
    nome = models.CharField(max_length=255, verbose_name="Nome da Propriedade")  # Nome da propriedade
    codigo = models.CharField(max_length=50, unique=True, verbose_name="Código da Propriedade")  # Código único da propriedade
    area_total_ha = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Área Total (ha)")  # Área total em hectares
    endereco_rua = models.CharField(max_length=255, null=True, blank=True, verbose_name="Rua")  # Rua da propriedade
    endereco_numero = models.CharField(max_length=10, null=True, blank=True, verbose_name="Número")  # Número da propriedade
    endereco_bairro = models.CharField(max_length=100, null=True, blank=True, verbose_name="Bairro")  # Bairro da propriedade
    endereco_municipio = models.CharField(max_length=100, verbose_name="Município")  # Município da propriedade
    endereco_estado = models.CharField(max_length=2, verbose_name="Estado (UF)")  # Estado da propriedade
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True, verbose_name="Latitude")  # Latitude geográfica
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True, verbose_name="Longitude")  # Longitude geográfica
    data_cadastro = models.DateTimeField(auto_now_add=True, verbose_name="Data de Cadastro")  # Data de cadastro automático

    class Meta:
        verbose_name = "Propriedade"
        verbose_name_plural = "Propriedades"

    def __str__(self):
        return f"{self.nome} ({self.produtor.nome})"

class Talhao(models.Model):
    propriedade = models.ForeignKey(
        Propriedade, on_delete=models.CASCADE, related_name='talhoes'
    )
    nome = models.CharField(max_length=255, verbose_name="Nome do Talhão")
    codigo = models.CharField(max_length=50, unique=True, verbose_name="Código do Talhão")
    area_ha = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Área (ha)")
    tipo_cultivo = models.CharField(max_length=100, verbose_name="Tipo de Cultivo")
    data_plantio = models.DateField(null=True, blank=True, verbose_name="Data de Plantio")
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True, verbose_name="Latitude")
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True, verbose_name="Longitude")
    data_cadastro = models.DateTimeField(auto_now_add=True, verbose_name="Data de Cadastro")

    class Meta:
        verbose_name = "Talhão"
        verbose_name_plural = "Talhões"

    def __str__(self):
        return f"{self.nome} ({self.propriedade.nome})"