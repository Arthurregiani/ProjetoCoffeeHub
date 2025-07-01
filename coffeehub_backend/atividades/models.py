# coffeehub_backend/atividades/models.py

from django.db import models

# Modelo que representa uma atividade agrícola realizada em um talhão
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
    )  # Talhão relacionado à atividade
    tipo_atividade = models.CharField(
        max_length=50, 
        choices=TIPO_ATIVIDADE_CHOICES, 
        verbose_name="Tipo de Atividade"
    )  # Tipo da atividade realizada
    data_atividade = models.DateField(verbose_name="Data da Atividade")  # Data em que a atividade foi realizada
    descricao = models.TextField(
        null=True, 
        blank=True, 
        verbose_name="Descrição"
    )  # Descrição detalhada da atividade
    custo = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        null=True, 
        blank=True, 
        verbose_name="Custo (R$)"
    )  # Custo da atividade
    observacoes = models.TextField(
        null=True, 
        blank=True, 
        verbose_name="Observações"
    )  # Observações adicionais
    data_registro = models.DateTimeField(
        auto_now_add=True, 
        verbose_name="Data de Registro"
    )  # Data de registro da atividade

    class Meta:
        verbose_name = "Atividade"
        verbose_name_plural = "Atividades"
        ordering = ["-data_atividade"]

    def __str__(self):
        return f"Atividade de {self.tipo_atividade} em {self.talhao.nome} ({self.data_atividade})"


# Modelo que representa uma colheita realizada em um talhão
class Colheita(models.Model):
    talhao = models.ForeignKey(
        "produtores.Talhao", 
        on_delete=models.CASCADE, 
        related_name="colheitas",
        verbose_name="Talhão"
    )  # Talhão relacionado à colheita
    data_colheita = models.DateField(verbose_name="Data da Colheita")  # Data em que a colheita foi realizada
    quantidade_kg = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        verbose_name="Quantidade Colhida (kg)"
    )  # Quantidade de café colhida em quilogramas
    tipo_cafe = models.CharField(
        max_length=100, 
        verbose_name="Tipo de Café Colhido"
    )  # Tipo de café colhido
    qualidade_colheita = models.CharField(
        max_length=50, 
        null=True, 
        blank=True, 
        verbose_name="Qualidade da Colheita"
    )  # Qualidade da colheita, se aplicável
    observacoes = models.TextField(
        null=True, 
        blank=True, 
        verbose_name="Observações"
    )  # Observações adicionais
    data_registro = models.DateTimeField(
        auto_now_add=True, 
        verbose_name="Data de Registro"
    )  # Data de registro da colheita

    class Meta:
        verbose_name = "Colheita"
        verbose_name_plural = "Colheitas"
        ordering = ["-data_colheita"]

    def __str__(self):
        return f"Colheita de {self.quantidade_kg}kg em {self.talhao.nome} ({self.data_colheita})"
