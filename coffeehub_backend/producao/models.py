# coffeehub_backend/producao/models.py

from django.db import models

class Lote(models.Model):
    colheita = models.ForeignKey(
        "atividades.Colheita", on_delete=models.CASCADE, related_name="lotes"
    )
    codigo_lote = models.CharField(max_length=50, unique=True, verbose_name="Código do Lote")
    quantidade_kg = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Quantidade (kg)")
    data_formacao = models.DateField(auto_now_add=True, verbose_name="Data de Formação do Lote")
    observacoes = models.TextField(null=True, blank=True, verbose_name="Observações")

    class Meta:
        verbose_name = "Lote"
        verbose_name_plural = "Lotes"

    def __str__(self):
        return self.codigo_lote


class Processamento(models.Model):
    lote = models.ForeignKey(
        Lote, on_delete=models.CASCADE, related_name="processamentos"
    )
    TIPO_PROCESSAMENTO_CHOICES = [
        ("Via Seca", "Via Seca"),
        ("Via Úmida", "Via Úmida"),
        ("Descascamento", "Descascamento"),
        ("Torra", "Torra"),
        ("Moagem", "Moagem"),
        ("Outro", "Outro"),
    ]
    tipo_processamento = models.CharField(
        max_length=50,
        choices=TIPO_PROCESSAMENTO_CHOICES,
        verbose_name="Tipo de Processamento"
    )
    data_processamento = models.DateField(verbose_name="Data de Processamento")
    quantidade_processada_kg = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Quantidade Processada (kg)"
    )
    observacoes = models.TextField(null=True, blank=True, verbose_name="Observações")

    class Meta:
        verbose_name = "Processamento"
        verbose_name_plural = "Processamentos"

    def __str__(self):
        return f"Processamento de {self.tipo_processamento} para o Lote {self.lote.codigo_lote}"
