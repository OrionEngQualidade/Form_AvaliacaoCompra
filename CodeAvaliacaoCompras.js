// ===================================================================================
// CONFIGURAÇÕES — AVALIAÇÃO DO TIME DE COMPRAS
// ===================================================================================

const AVALIACAO_COMPRAS = {
  remetente: 'Orion Qualidade - SP',
  imagemTopo: 'https://i.imgur.com/C3HplJd.png',
  formId: '1eufgRXckVNsiONgN3qekvFw4VsIYP2l4tHoZgtSfHtE', // ID FORMULÁRIO
  emails: [
    'lucas.garcia@grupoorion.com.br',
    'hugo.pereira@grupoorion.com.br',
    'vlademir.bandeira@grupoorion.com.br',
    'vagner.garnier@grupoorion.com.br',
    'thiago.farias@grupoorion.com.br',
    'thiago.barros@grupoorion.com.br',
    'thalia.brito@grupoorion.com.br',
    'tatiana.kussano@grupoorion.com.br',
    'tamires.lucena@grupoorion.com.br',
    'samuel.soares@grupoorion.com.br',
    'rodrigo.dias@grupoorion.com.br',
    'regiane.favareto@grupoorion.com.br',
    'pedro.lira@grupoorion.com.br',
    'aquinara.santos@grupoorion.com.br',
    'joao.veiga@grupoorion.com.br',
    'jessica.lira@grupoorion.com.br',
    'luis.camargos@grupoorion.com.br',
    'lucas.santos@grupoorion.com.br',
    'fellipe.araujo@grupoorion.com.br',
    'everton.vale@grupoorion.com.br',
    'edson.costa@grupoorion.com.br',
    'diego.cunha@grupoorion.com.br',
    'danilo.santos@grupoorion.com.br',
    'anna.freitas@grupoorion.com.br',
    'alvaro.souza@grupoorion.com.br',
    'alvaro.alves@grupoorion.com.br',
    'simone.nascimento@grupoorion.com.br',
    'carlos.esquerdo@grupoorion.com.br'
  ]
};

// ===================================================================================
// FUNÇÕES AUXILIARES
// ===================================================================================

function getMesReferencia() {
  const meses = [
    'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
  ];
  const hoje = new Date();
  hoje.setMonth(hoje.getMonth() - 1);
  return meses[hoje.getMonth()];
}

function getAssuntoCompras() {
  return `Avaliação Mensal de ${getMesReferencia()} - Equipe de Compras`;
}

function getFormCompras() {
  return FormApp.openById(AVALIACAO_COMPRAS.formId);
}

function formatarNome(email) {
  return email
    .split('@')[0]
    .split('.')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

// ===================================================================================
// HTML DO E-MAIL
// ===================================================================================

function criarCorpoEmailCompras(nome, link) {

  const mes = getMesReferencia();

  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f2;padding:20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:6px;overflow:hidden;">

          <tr>
            <td>
              <img src="${AVALIACAO_COMPRAS.imagemTopo}" width="600" style="display:block;">
            </td>
          </tr>

          <tr>
            <td style="padding:30px;font-family:Arial;color:#333;font-size:14px;line-height:1.6;">
              <p>Prezado(a) <strong>${nome}</strong>,</p>

              <p>
                Avalie a <strong>Equipe de Compras</strong> referente ao
                <strong>mês de ${mes}</strong>, compartilhando seu feedback sobre
                prazos, clareza e atendimento.
              </p>

              <p>
                A avaliação leva menos de 2 minutos, é confidencial e contribui
                diretamente para a melhoria dos processos internos.
              </p>

              <table align="center" style="margin:30px auto;">
                <tr>
                  <td bgcolor="#1a73e8" style="border-radius:30px;">
                    <a href="${link}" target="_blank"
                      style="display:inline-block;padding:14px 36px;
                      color:#fff;text-decoration:none;font-weight:bold;">
                      Responder à Avaliação
                    </a>
                  </td>
                </tr>
              </table>

              <p style="text-align:center;color:#9ca3af;font-size:12px;">
                Envio automático do Setor de Qualidade.<br>Por favor, não responda.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

// ===================================================================================
// ENVIO PRINCIPAL (PRODUÇÃO)
// ===================================================================================

function enviarEmailAvaliacaoCompras() {

  try {
    const form = getFormCompras();
    const link = form.getPublishedUrl();
    if (!link) throw new Error('Link do formulário indisponível');

    for (const email of AVALIACAO_COMPRAS.emails) {
      const nome = formatarNome(email);

      MailApp.sendEmail({
        to: email,
        subject: getAssuntoCompras(),
        htmlBody: criarCorpoEmailCompras(nome, link),
        name: AVALIACAO_COMPRAS.remetente
      });
    }

  } catch (e) {
    Logger.log('Erro no envio da Avaliação de Compras: ' + e.message);
  }
}

// ===================================================================================
// ENVIO DE VALIDAÇÃO — SOMENTE LUCAS
// ===================================================================================

function enviarEmailAvaliacaoComprasTesteLucas() {

  try {
    const form = getFormCompras();
    const link = form.getPublishedUrl();
    if (!link) throw new Error('Link do formulário indisponível');

    MailApp.sendEmail({
      to: 'lucas.garcia@grupoorion.com.br',
      subject: `[TESTE] ${getAssuntoCompras()}`,
      htmlBody: criarCorpoEmailCompras('Lucas Garcia', link),
      name: AVALIACAO_COMPRAS.remetente
    });

    Logger.log('E-mail de TESTE (Compras) enviado para Lucas');

  } catch (e) {
    Logger.log('Erro no envio de TESTE (Compras): ' + e.message);
  }
}
