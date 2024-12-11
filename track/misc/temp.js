     // const options = await page.$$('a cite');
            // let i = 0;
            // for (const option of options) {
            //     const label = await page.evaluate(el => el.textContent, option);
            //     console.log("label: ", organicResultsLength++, label)
            // }

            // const headings = Array.from(
            //     document.querySelectorAll('.article--full h2, .article--full h3')
            //   ).filter(el => !el.closest('.toc-excluded'));
            

            organicResults = await page.evaluate(
                () => 
                    Array
                        .from(document.querySelectorAll('a cite'))
                        // .filter(el => !el.closest('.related-question-pair'))
                        , element => element.textContent
                    )
                    // element => element.textContent
            // );
