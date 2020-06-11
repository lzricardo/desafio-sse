module.exports = (moduleName) => {
    try {
        return require(moduleName);
    } catch (e) {
        console.error(e);
    }
};