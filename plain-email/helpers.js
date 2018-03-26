function cleanup(results) {
    results = results.filter((mail) => {
        if (isEmail(mail)) {
            return mail;
        }
    });

    results = results.map((mail) => {
        return { mail };
    });
}