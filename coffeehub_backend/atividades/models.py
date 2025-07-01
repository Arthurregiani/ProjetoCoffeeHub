# coffeehub_backend/atividades/models.py

from django.db import models

class Atividade(models.Model):
    TIPO_ATIVIDADE_CHOICES = [
        ("Plantio", "Plantio"),
        ("Colheita", "Colheita"),
        ("Adubacao", "Adubação"),
        ("Pulverizacao", "Pulverização"),
        ("Irrigacao", "Irrigação"),
        ("Poda", "Poda"),
        ("Outro", "Outro"),
    ]

    talhao = models.ForeignKey(
        "produtores.Talhao", 
        on_delete=models.CASCADE, 
        related_name="atividades",
        verbose_name="Talhão"
    )
    tipo_atividade = models.CharField(
        max_length=50, 
        choices=TIPO_ATIVIDADE_CHOICES, 
        verbose_name="Tipo de Atividade"
    )
    data_atividade = models.DateField(verbose_name="Data da Atividade")
    descricao = models.TextField(
        null=True, 
        blank=True, 
        verbose_name="Descrição"
    )
    custo = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        null=True, 
        blank=True, 
        verbose_name="Custo (R$)"
    )
    observacoes = models.TextField(
        null=True, 
        blank=True, 
        verbose_name="Observações"
    )
    data_registro = models.DateTimeField(
        auto_now_add=True, 
        verbose_name="Data de Registro"
    )

    class Meta:
        verbose_name = "Atividade"
        verbose_name_plural = "Atividades"
        ordering = ["-data_atividade"]

    def __str__(self):
        return f"Atividade de {self.tipo_atividade} em {self.talhao.nome} ({self.data_atividade})"


class Colheita(models.Model):
    talhao = models.ForeignKey(
        "produtores.Talhao", 
        on_delete=models.CASCADE, 
        related_name="colheitas",
        verbose_name="Talhão"
    )
    data_colheita = models.DateField(verbose_name="Data da Colheita")
    quantidade_kg = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        verbose_name="Quantidade Colhida (kg)"
    )
    tipo_cafe = models.CharField(
        max_length=100, 
        verbose_name="Tipo de Café Colhido"
    )
    qualidade_colheita = models.CharField(
        max_length=50, 
        null=True, 
        blank=True, 
        verbose_name="Qualidade da Colheita"
    )
    observacoes = models.TextField(
        null=True, 
        blank=True, 
        verbose_name="Observações"
    )
    data_registro = models.DateTimeField(
        auto_now_add=True, 
        verbose_name="Data de Registro"
    )

    class Meta:
        verbose_name = "Colheita"
        verbose_name_plural = "Colheitas"
        ordering = ["-data_colheita"]

    def __str__(self):
        return f"Colheita de {self.quantidade_kg}kg em {self.talhao.nome} ({self.data_colheita})"
