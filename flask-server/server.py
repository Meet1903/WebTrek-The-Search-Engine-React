from flask import Flask, render_template, request, redirect, url_for, jsonify
from data_scrapper import get_urls, save_html, delete_files_in_folder
from elastic_logics import insert_data_elastic, search_on_elastic, insert_query_history, fetch_history, delete_all_history
from prepare_query import prepare_query
from ranking_algorithm import initiate_ranking_algorithm
import os

app = Flask(__name__)

def is_valid_url(url):
    return url.startswith("http://") or url.startswith("https://")

@app.route("/")
def index():
    # return render_template("index.html", data=' ')
    return render_template("index.html")
app = Flask(__name__)

@app.route('/search', methods=['POST', 'GET'])
def search():
    next_page = False
    prev_page = False
    current_page = 1
    page = request.args.get('page')
    if page:
        current_page = int(page)
    if request.method == 'POST' and request.form['query']:
        original_query = request.form['query']
        insert_query_history(original_query)
    else:
        original_query = request.args.get('query')
        insert_query_history(original_query)
    query = original_query.lower()
    clearn_query = prepare_query(query)
    ranked_result = search_on_elastic(clearn_query, page_number=current_page)

    is_data_on_next_page = search_on_elastic(clearn_query, page_number=current_page + 1)
    
    if is_data_on_next_page:
        next_page = True
    if current_page > 1:
        prev_page = True

    results = []
    for doc in ranked_result:
        results.append({'title': doc['title'], 'domain': doc['domain'], 'url': doc['url'], 'snippet': doc['summary']})
    
    return jsonify({
        'query': original_query,
        'results': results,
        'current_page': current_page,
        'next_page': next_page,
        'prev_page': prev_page
    })

# @app.route('/search', methods=['POST', 'GET'])
# def search():
#     next_page = False
#     prev_page = False
#     current_page = 1
#     page = request.args.get('page')
#     if page:
#         current_page = int(page)
#     if request and request.form and request.form['query']:
#         original_query = request.form['query']
#         insert_query_history(original_query)
#     else:
#         original_query = request.args.get('query')
#     # original_query = request.form['query']
#     query = original_query.lower()
#     clearn_query = prepare_query(query)
#     ranked_result = search_on_elastic(clearn_query, page_number=current_page)

#     is_data_on_next_page = search_on_elastic(clearn_query, page_number=current_page + 1)
    
#     if is_data_on_next_page:
#         next_page = True
#     if current_page > 1:
#         prev_page = True

#     results = []
#     for doc in ranked_result:
#         results.append({'title': doc['title'], 'domain': doc['domain'], 'url': doc['url'], 'snippet': doc['summary']})
#     return render_template('results.html', query=original_query, results=results, current_page = current_page, next_page=next_page, prev_page = prev_page)

@app.route("/scrapper")
def scrapper():
    return render_template("scrapper.html")

@app.route("/scrapper", methods=["POST"])
def scrape():
    if request.method == "POST":
        domains = request.form.get("url")
        folder = request.form.get("path")
        domains = domains.replace(" ", "").split(",")
        print(domains, folder)
        urls = get_urls(domains)
        print(folder)
        save_html(urls, folder)
        success_count = insert_data_elastic(folder)
        delete_files_in_folder(folder)
        if success_count:
            return "Scraping completed successfully!"
        else:
            return "Scraping failed" 
        
@app.route("/history")
def history():
    next_page = False
    prev_page = False
    current_page = 1
    page = request.args.get('page')
    if page:
        current_page = int(page)

    queries, timestamps = fetch_history(page_number=current_page)
    history = list(zip(queries, timestamps))

    is_data_on_next_page, _ = fetch_history(page_number=current_page + 1)
    
    if is_data_on_next_page:
        next_page = True
    if current_page > 1:
        prev_page = True
    
    return jsonify({
        "history": history,
        "current_page": current_page,
        "next_page": next_page,
        "prev_page": prev_page
    })

@app.route("/history", methods=["POST"])
def clean_history():
    delete_all_history()
    return "History cleaned successfully!"
    # return render_template("history.html", history=None)

@app.route("/members")
def members():
    return {"members":["member1", "member2", "memvber3"]}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)