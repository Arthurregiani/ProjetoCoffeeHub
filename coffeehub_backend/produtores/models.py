from django.db import models

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

    nome = models.CharField(max_length=255, verbose_name="Nome Completo")
    codigo = models.CharField(max_length=50, unique=True, verbose_name="Código do Produtor")
    data_cadastro = models.DateTimeField(auto_now_add=True, verbose_name="Data de Cadastro")
    data_nascimento = models.DateField(null=True, blank=True, verbose_name="Data de Nascimento")
    telefone = models.CharField(max_length=20, null=True, blank=True, verbose_name="Telefone")
    email = models.EmailField(max_length=255, unique=True, verbose_name="E-mail")
    identificacao = models.CharField(max_length=14, unique=True, verbose_name="CPF/CNPJ")
    sexo = models.CharField(max_length=10, choices=SEXO_CHOICES, null=True, blank=True, verbose_name="Sexo")
    endereco_rua = models.CharField(max_length=255, null=True, blank=True, verbose_name="Rua")
    endereco_numero = models.CharField(max_length=10, null=True, blank=True, verbose_name="Número")
    endereco_bairro = models.CharField(max_length=100, null=True, blank=True, verbose_name="Bairro")
    endereco_municipio = models.CharField(max_length=100, null=True, blank=True, verbose_name="Município")
    endereco_estado = models.CharField(max_length=2, null=True, blank=True, verbose_name="Estado (UF)")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Ativo', verbose_name="Status")

    class Meta:
        verbose_name = "Produtor"
        verbose_name_plural = "Produtores"

    def __str__(self):
        return self.nome


class Propriedade(models.Model):
    produtor = models.ForeignKey(
        Produtor, on_delete=models.CASCADE, related_name='propriedades'
    )
    nome = models.CharField(max_length=255, verbose_name="Nome da Propriedade")
    codigo = models.CharField(max_length=50, unique=True, verbose_name="Código da Propriedade")
    area_total_ha = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Área Total (ha)")
    endereco_rua = models.CharField(max_length=255, null=True, blank=True, verbose_name="Rua")
    endereco_numero = models.CharField(max_length=10, null=True, blank=True, verbose_name="Número")
    endereco_bairro = models.CharField(max_length=100, null=True, blank=True, verbose_name="Bairro")
    endereco_municipio = models.CharField(max_length=100, verbose_name="Município")
    endereco_estado = models.CharField(max_length=2, verbose_name="Estado (UF)")
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True, verbose_name="Latitude")
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True, verbose_name="Longitude")
    data_cadastro = models.DateTimeField(auto_now_add=True, verbose_name="Data de Cadastro")

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