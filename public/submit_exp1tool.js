document.getElementById('finish-experiment-button').addEventListener('click', function() {
    fetch('/experiment/1/tool', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(gazeData)
    })
    .then(data => {
        // Debugging
        console.log('PART 2 COMPLETE')
        console.log(gazeData)
        // Redirect to proper part
        window.location.href = '/experiment_break'
    })
})