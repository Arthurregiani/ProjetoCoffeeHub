from django.db import models

# Modelo que representa um insumo agrícola
class Insumo(models.Model):
    TIPO_INSUMO_CHOICES = [
        ('Fertilizante', 'Fertilizante'),
        ('Agroquímico', 'Agroquímico'),
        ('Outro', 'Outro'),
    ]
    nome = models.CharField(max_length=255, unique=True, verbose_name="Nome do Insumo")  # Nome do insumo
    tipo = models.CharField(max_length=50, choices=TIPO_INSUMO_CHOICES, verbose_name="Tipo de Insumo")  # Tipo do insumo
    unidade_medida = models.CharField(max_length=20, verbose_name="Unidade de Medida")  # Unidade de medida do insumo
    descricao = models.TextField(null=True, blank=True, verbose_name="Descrição")  # Descrição do insumo
    data_cadastro = models.DateTimeField(auto_now_add=True, verbose_name="Data de Cadastro")  # Data de cadastro automático

    class Meta:
        verbose_name = "Insumo"
        verbose_name_plural = "Insumos"

    def __str__(self):
        return self.nome

# Modelo que representa um fertilizante, herdando de Insumo
class Fertilizante(models.Model):
    insumo_ptr = models.OneToOneField(
        Insumo, on_delete=models.CASCADE, parent_link=True, primary_key=True
    )  # Relação com o insumo base
    composicao = models.TextField(verbose_name="Composição")  # Composição do fertilizante
    garantia = models.CharField(max_length=100, null=True, blank=True, verbose_name="Garantia")  # Garantia do fertilizante

    class Meta:
        verbose_name = "Fertilizante"
        verbose_name_plural = "Fertilizantes"

    def __str__(self):
        return self.insumo_ptr.nome

# Modelo que representa um agroquímico, herdando de Insumo
class Agroquimico(models.Model):
    insumo_ptr = models.OneToOneField(
        Insumo, on_delete=models.CASCADE, parent_link=True, primary_key=True
    )  # Relação com o insumo base
    classe_toxicologica = models.CharField(max_length=50, verbose_name="Classe Toxicológica")  # Classe toxicológica
    registro_ministerio = models.CharField(max_length=100, unique=True, verbose_name="Registro no Ministério")  # Registro oficial

    class Meta:
        verbose_name = "Agroquímico"
        verbose_name_plural = "Agroquímicos"

    def __str__(self):
        return self.insumo_ptr.nome

# Modelo que representa o estoque de insumos em uma propriedade
class EstoqueInsumo(models.Model):
    insumo = models.ForeignKey(Insumo, on_delete=models.CASCADE, related_name='estoques')  # Insumo relacionado
    propriedade = models.ForeignKey(
        "produtores.Propriedade", on_delete=models.CASCADE, related_name='estoques_insumo'
    )  # Propriedade relacionada
    quantidade = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Quantidade")  # Quantidade em estoque
    data_atualizacao = models.DateTimeField(auto_now=True, verbose_name="Data de Atualização")  # Data da última atualização

    class Meta:
        verbose_name = "Estoque de Insumo"
        verbose_name_plural = "Estoques de Insumo"

    def __str__(self):
        return f"{self.insumo.nome} - {self.propriedade.nome}"
