const getHomePage = async (req, res) => {
    res.json({ message: "Hello world." });
}

module.exports = { getHomePage };