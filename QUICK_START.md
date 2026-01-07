# Quick Start: Using Gemini AI for Code Visualization

## 3-Step Setup

### Step 1: Get Your API Key (2 minutes)
1. Go to https://makersuite.google.com/
2. Sign in with your Google account
3. Click "Get API Key" → "Create new secret key"
4. Copy the key to your clipboard

### Step 2: Add API Key to App (1 minute)
1. Look for the **"⚙️ API Key"** button in the Python Editor panel
2. Click it to open the input field
3. Paste your API key
4. Click **Save**

### Step 3: Write Code and Visualize (1 minute)
1. Write Python code in the editor (or use example below)
2. Click the **"AI Visualize"** button (green, with sparkles ✨)
3. Watch the visualization update automatically!

## Try This Right Now

Copy and paste this code into the Python editor:

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

arr = [64, 34, 25, 12, 22, 11, 90]
result = bubble_sort(arr)
```

Then click **"AI Visualize"** and watch it animate!

## Supported Algorithms

The AI can understand and visualize:

- ✅ Sorting: Bubble Sort, Quick Sort, Merge Sort, Selection Sort
- ✅ Searching: Binary Search, Linear Search
- ✅ Data Structures: Arrays, Linked Lists, Binary Trees
- ✅ Custom Algorithms: Any Python code with clear patterns

## Buttons Explained

| Button | Color | Purpose |
|--------|-------|---------|
| Save | Gray | Download code to file |
| ⚙️ API Key | Purple | Enter/manage Gemini API key |
| AI Visualize | Green | Analyze with Gemini AI |
| Visualize | Blue | Quick local analysis |

## Keyboard Tips

- **Tab** - Insert 4 spaces in code
- **Type normally** - Full editor support

## Common Errors & Solutions

| Problem | Solution |
|---------|----------|
| "Please enter your Gemini API key" | Click ⚙️ button, paste key, click Save |
| "Invalid API Key" | Double-check key at makersuite.google.com |
| "No response from Gemini" | Check internet, try again in a moment |
| Weird visualization | Try clearer variable names in code |

## Privacy Note

- Your API key stays on your computer (localStorage)
- Code is sent to Google's servers for analysis
- Don't use with extremely sensitive code

## What Happens Behind the Scenes

1. **You click "AI Visualize"**
   ↓
2. **Code + API key sent to Gemini AI**
   ↓
3. **Gemini analyzes the algorithm**
   ↓
4. **Returns step-by-step execution**
   ↓
5. **Visualization displays the steps**
   ↓
6. **You use animation controls to explore**

## More Examples to Try

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

arr = [10, 20, 30, 40, 50, 60, 70]
target = 40
```

### Linked List
```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def create_list(values):
    head = Node(values[0])
    current = head
    for val in values[1:]:
        current.next = Node(val)
        current = current.next
    return head

values = [10, 20, 30, 40]
head = create_list(values)
```

### Selection Sort
```python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

arr = [29, 10, 14, 37, 13]
result = selection_sort(arr)
```

## Control Your Visualization

Once the AI has created the visualization:
- **Play/Pause** - Control animation
- **Step Forward/Backward** - Go through step-by-step
- **Speed Slider** - Change animation speed
- **Reset** - Go back to the start

## Tips for Best Results

1. **Use clear variable names** - `arr`, `target`, `head`, etc.
2. **Initialize data clearly** - `arr = [...]` at the top
3. **Include algorithm logic** - Don't just show data
4. **One algorithm per code** - Don't mix multiple algorithms
5. **Add comments** - Helps Gemini understand your intent

## API Key Management

- **Stored in**: Browser localStorage (your computer only)
- **Never shared**: Only sent to makersuite.google.com
- **Clear anytime**: Just click ⚙️ and overwrite with empty value
- **Multiple devices**: Need separate key per device

## What If Something Goes Wrong?

1. **Refresh the page** - Try again
2. **Clear API key and re-enter** - Might be a typo
3. **Check internet connection** - Need to reach Google's servers
4. **Check API quota** - Visit makersuite.google.com to see usage
5. **Try simpler code** - Complex code might confuse the AI

## Questions?

- Check full docs: See `GEMINI_SETUP.md`
- See implementation details: Check `IMPLEMENTATION.md`
- Get API key: Visit https://makersuite.google.com/
- Report issues: Contact project maintainers

---

**Happy visualizing! 🎉**
