# coffeehub_backend/insumos/models.py

from django.db import models

class Insumo(models.Model):
    TIPO_INSUMO_CHOICES = [
        ('Fertilizante', 'Fertilizante'),
        ('Agroquímico', 'Agroquímico'),
        ('Outro', 'Outro'),
    ]
    nome = models.CharField(max_length=255, unique=True, verbose_name="Nome do Insumo")
    tipo = models.CharField(max_length=50, choices=TIPO_INSUMO_CHOICES, verbose_name="Tipo de Insumo")
    unidade_medida = models.CharField(max_length=20, verbose_name="Unidade de Medida")
    descricao = models.TextField(null=True, blank=True, verbose_name="Descrição")
    data_cadastro = models.DateTimeField(auto_now_add=True, verbose_name="Data de Cadastro")

    class Meta:
        verbose_name = "Insumo"
        verbose_name_plural = "Insumos"

    def __str__(self):
        return self.nome

class Fertilizante(models.Model):
    insumo_ptr = models.OneToOneField(
        Insumo, on_delete=models.CASCADE, parent_link=True, primary_key=True
    )
    composicao = models.TextField(verbose_name="Composição")
    garantia = models.CharField(max_length=100, null=True, blank=True, verbose_name="Garantia")

    class Meta:
        verbose_name = "Fertilizante"
        verbose_name_plural = "Fertilizantes"

    def __str__(self):
        return self.insumo_ptr.nome

class Agroquimico(models.Model):
    insumo_ptr = models.OneToOneField(
        Insumo, on_delete=models.CASCADE, parent_link=True, primary_key=True
    )
    classe_toxicologica = models.CharField(max_length=50, verbose_name="Classe Toxicológica")
    registro_ministerio = models.CharField(max_length=100, unique=True, verbose_name="Registro no Ministério")

    class Meta:
        verbose_name = "Agroquímico"
        verbose_name_plural = "Agroquímicos"

    def __str__(self):
        return self.insumo_ptr.nome

class EstoqueInsumo(models.Model):
    insumo = models.ForeignKey(Insumo, on_delete=models.CASCADE, related_name='estoques')
    propriedade = models.ForeignKey(
        "produtores.Propriedade", on_delete=models.CASCADE, related_name='estoques_insumo'
    )
    quantidade = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Quantidade")
    data_atualizacao = models.DateTimeField(auto_now=True, verbose_name="Data de Atualização")

    class Meta:
        verbose_name = "Estoque de Insumo"
        verbose_name_plural = "Estoques de Insumos"
        unique_together = ("insumo", "propriedade")  # Garante que um insumo só tenha um estoque por propriedade

    def __str__(self):
        return f"Estoque de {self.insumo.nome} em {self.propriedade.nome}: {self.quantidade} {self.insumo.unidade_medida}"
