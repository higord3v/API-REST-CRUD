const jwt = require('jsonwebtoken');
const chave = require('../chave_secreta');
const conexao = require('../conexao');

const validaToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            mensagem: 'É necessário autenticar-se para prosseguir.'
        });
    }

    try {
        const token = authorization.replace('Bearer', '').trim();
        const { id } = jwt.verify(token, chave);

        const query = `SELECT * FROM usuarios WHERE id = $1`;
        const { rows, rowCount } = await conexao.query(query, [id]);
    
        if (rowCount === 0) {
            return res.status(404).json({
                mensagem: 'Não foi possível localizar o usuário.'
            })
        }

        const { nome, email, nome_loja } = rows[0];
        const dadosUsuario = {id, nome, email, nome_loja};
        req.usuario = {...dadosUsuario};
        next();

    } catch (error) {
        return res.status(401).json({
            mensagem: 'A validação de token falhou.'
        })
    }
    
}

module.exports = validaToken;
