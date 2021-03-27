

module.exports = {
    index(req, res){
        res.json({message: 'Hello World from Controller Doador'});
    },
    create(req,res){
        let msg = '';
        res.json({msg: msg})
    }
}