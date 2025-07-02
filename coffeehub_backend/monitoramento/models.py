# coffeehub_backend/monitoramento/models.py

from django.db import models


class MedicaoIndicador(models.Model):
    talhao = models.ForeignKey(
        "produtores.Talhao", on_delete=models.CASCADE, related_name="medicoes"
    )
    TIPO_INDICADOR_CHOICES = [
        ("Temperatura", "Temperatura"),
        ("Umidade", "Umidade"),
        ("pH Solo", "pH do Solo"),
        ("Nutrientes Solo", "Nutrientes do Solo"),
        ("Produtividade", "Produtividade"),
        ("Outro", "Outro"),
    ]
    tipo_indicador = models.CharField(
        max_length=50, choices=TIPO_INDICADOR_CHOICES, verbose_name="Tipo de Indicador"
    )
    valor = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Valor"
    )
    unidade_medida = models.CharField(
        max_length=20, verbose_name="Unidade de Medida"
    )
    data_medicao = models.DateTimeField(verbose_name="Data da Medição")
    observacoes = models.TextField(
        null=True, blank=True, verbose_name="Observações"
    )

    class Meta:
        verbose_name = "Medição de Indicador"
        verbose_name_plural = "Medições de Indicadores"
        ordering = ["-data_medicao"]

    def __str__(self):
        return f"Medição de {self.tipo_indicador} ({self.valor} {self.unidade_medida}) em {self.talhao.nome}"


class EventoRastreabilidade(models.Model):
    lote = models.ForeignKey(
        "producao.Lote", on_delete=models.CASCADE, related_name="eventos_rastreabilidade"
    )
    TIPO_EVENTO_CHOICES = [
        ("Colheita", "Colheita"),
        ("Processamento", "Processamento"),
        ("Armazenamento", "Armazenamento"),
        ("Transporte", "Transporte"),
        ("Comercializacao", "Comercialização"),
        ("Outro", "Outro"),
    ]
    tipo_evento = models.CharField(
        max_length=50, choices=TIPO_EVENTO_CHOICES, verbose_name="Tipo de Evento"
    )
    data_evento = models.DateTimeField(verbose_name="Data do Evento")
    local = models.CharField(max_length=255, verbose_name="Local do Evento")
    descricao = models.TextField(
        null=True, blank=True, verbose_name="Descrição"
    )
    responsavel = models.CharField(
        max_length=255, null=True, blank=True, verbose_name="Responsável"
    )

    class Meta:
        verbose_name = "Evento de Rastreabilidade"
        verbose_name_plural = "Eventos de Rastreabilidade"
        ordering = ["-data_evento"]

    def __str__(self):
        return f"Evento de {self.tipo_evento} para o Lote {self.lote.codigo_lote} em {self.data_evento}"
