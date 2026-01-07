# Gemini AI Code Visualization Setup Guide

This project now supports AI-powered code visualization using the Google Gemini API. You can write custom Python code and have it analyzed and visualized automatically.

## Features

- **AI Code Analysis**: Enter custom Python code and let Gemini AI analyze it
- **Automatic Visualization**: Get step-by-step visualization of your algorithm
- **Multiple Data Structures**: Support for arrays, linked lists, trees, and generic algorithms
- **Secure API Key Storage**: Your API key is stored locally in browser storage

## Setup Instructions

### Step 1: Get a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/)
2. Sign in with your Google account
3. Click on "Get API Key" or "Create new secret key"
4. Copy your API key

### Step 2: Enter API Key in the Application

1. Open the Code Visualizer application in your browser
2. Look for the "⚙️ API Key" button in the Python Editor panel (top right)
3. Click the button to reveal the API key input field
4. Paste your Gemini API key into the input field
5. Click "Save" to store it locally (it will be remembered for future sessions)

### Step 3: Write and Visualize Your Code

1. Write your Python code in the editor
2. Click the "AI Visualize" button (green button with sparkles icon) to analyze with Gemini
3. The AI will:
   - Analyze your code
   - Identify the algorithm type
   - Extract data values
   - Generate step-by-step execution visualization

## Supported Code Patterns

The Gemini analyzer can understand:

- **Sorting Algorithms**: Bubble sort, quick sort, merge sort, selection sort
- **Searching Algorithms**: Binary search, linear search
- **Data Structures**: Arrays, linked lists, binary trees
- **Custom Algorithms**: Any Python code with clear data structure initialization

## Example Code

### Bubble Sort
```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

arr = [64, 34, 25, 12, 22, 11, 90]
result = bubble_sort(arr)
```

### Binary Search
```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

arr = [11, 12, 22, 25, 34, 64, 90]
target = 25
```

### Linked List
```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def create_linked_list(values):
    head = Node(values[0])
    current = head
    for val in values[1:]:
        current.next = Node(val)
        current = current.next
    return head

values = [10, 20, 30, 40]
head = create_linked_list(values)
```

## API Usage Notes

- **Rate Limits**: Google Gemini API has rate limits. Check your quota at [Google AI Studio](https://makersuite.google.com/)
- **Token Usage**: Each analysis uses some tokens. Keep an eye on your usage
- **Free Tier**: Check current free tier limits at Google's documentation
- **No Data Collection**: Your code is sent to Google's servers for analysis only during the request

## Troubleshooting

### "Please enter your Gemini API key"
- Make sure you've entered your API key and clicked Save
- Refresh the page if you just saved it

### "Gemini API Error: Invalid API Key"
- Double-check that your API key is correct
- Make sure you copied the entire key without extra spaces
- Verify your API key is active at Google AI Studio

### "Could not parse Gemini response as JSON"
- This might happen if the AI response is unexpected
- Try reformulating your code to be clearer
- Ensure your code has clear variable initializations

### "No response from Gemini API"
- Check your internet connection
- Verify your API key is valid
- Try again in a few moments (might be a temporary issue)

## Switching Between Visualization Methods

The application provides two visualization methods:

1. **AI Visualize** (Green button): Uses Gemini AI for intelligent analysis
   - Better for custom algorithms
   - Understands code logic
   - Generates realistic execution steps

2. **Visualize** (Blue button): Uses the built-in parser
   - Fast and local
   - Works for predefined algorithm patterns
   - No API key needed

## Privacy & Security

- Your API key is stored in your browser's localStorage
- It's only sent to Google's Gemini API servers
- The code you enter is transmitted to Google for analysis
- Consider this when working with sensitive code

## Keyboard Shortcuts

- **Tab**: Insert 4 spaces (in editor)
- **Ctrl+Enter** or **Cmd+Enter**: Could be customized in future versions

## Future Improvements

Possible enhancements:
- Support for more programming languages
- Custom visualization parameters
- Save and share visualization sessions
- Offline mode with basic algorithm detection
- Integration with other AI models
