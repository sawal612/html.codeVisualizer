# Gemini AI Integration - Quick Reference Card

## 🎯 Feature: Visualize Custom Python Code with Gemini AI

### What It Does
Analyzes your Python code using Google Gemini AI and creates step-by-step visualization.

### How to Use It (3 Steps)

**Step 1: Get API Key** (2 min)
```
Visit: https://makersuite.google.com/
→ Sign in with Google
→ Click "Get API Key"
→ Copy the key
```

**Step 2: Add to App** (1 min)
```
Click: ⚙️ API Key button (purple)
Paste: Your Gemini API key
Click: Save
```

**Step 3: Visualize** (1 min)
```
Write: Python code in editor
Click: ✨ AI Visualize button (green)
Watch: Code gets analyzed
See: Step-by-step animation
```

---

## 🔘 Button Guide

| Button | Color | What It Does |
|--------|-------|-------------|
| **Save** | Gray | Download code to .py file |
| **⚙️ API Key** | Purple | Enter/manage Gemini API key |
| **✨ AI Visualize** | Green | Analyze with Gemini AI |
| **▶️ Visualize** | Blue | Quick local analysis (no API needed) |

---

## 🎨 Supported Algorithms

### Sorting
- Bubble Sort
- Quick Sort
- Merge Sort
- Selection Sort

### Searching
- Binary Search
- Linear Search

### Data Structures
- Arrays
- Linked Lists
- Binary Trees

### Custom Code
- Any Python algorithm with clear structure

---

## 📝 Code Template

```python
# Make sure to include:
# 1. Clear variable names (arr, target, head, etc.)
# 2. Initialize data clearly
# 3. Include algorithm logic

def algorithm_name(data):
    # Your algorithm here
    pass

# Initialize data
data = [values]  # or [1, 2, 3, ...]
# Call algorithm
result = algorithm_name(data)
```

---

## ⌨️ Keyboard Tips

| Key | Action |
|-----|--------|
| **Tab** | Insert 4 spaces |
| **Enter** | New line |
| Type | Normal code entry |

---

## ❌ Error Solutions

| Error | Solution |
|-------|----------|
| "Please enter API key" | Click ⚙️, paste key, click Save |
| "Invalid API Key" | Check key at makersuite.google.com |
| "No response" | Check internet, try again |
| No visualization | Try simpler code with clear structure |

---

## 🔒 Security

- ✅ API key stored locally (not in cloud)
- ✅ Only sent to Google servers
- ✅ Password-masked input
- ✅ Can clear anytime

---

## 📊 What Gets Sent to Google

When you click "AI Visualize":
1. Your Python code
2. Your API key

**Not sent:**
- Any other files
- Your browser history
- Personal information

---

## ⚡ Performance

| Action | Time |
|--------|------|
| Analyze code | 1-3 seconds |
| Show visualization | Instant |
| Animation | Smooth (user controlled) |

---

## 📱 Works On

- ✅ Desktop browsers (Chrome, Firefox, Safari, Edge)
- ✅ Tablets
- ⚠️ Mobile (limited, landscape view recommended)

---

## 🎓 Example Code

**Try Bubble Sort:**
```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

arr = [64, 34, 25, 12, 22, 11, 90]
bubble_sort(arr)
```

**Try Binary Search:**
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

arr = [10, 20, 30, 40, 50]
target = 30
```

---

## 🎬 After Visualization

Use these controls:
- **Play** - Watch algorithm run
- **Pause** - Stop animation
- **Step** → ← - Go step-by-step
- **Reset** - Start over
- **Speed** slider - Control animation speed

---

## 🆘 Need Help?

| Question | Answer |
|----------|--------|
| How do I get started? | Read QUICK_START.md |
| Complete setup guide? | Read GEMINI_SETUP.md |
| How does it work? | Read IMPLEMENTATION.md |
| See the UI changes? | Read UI_GUIDE.md |

---

## 💡 Pro Tips

1. **Use clear variable names** - Helps AI understand
2. **Initialize data at top** - `arr = [...]`
3. **One algorithm per code** - Don't mix algorithms
4. **Add comments** - AI can understand your intent
5. **Start simple** - Try examples before custom code

---

## 🔄 Workflow

```
1. Click ⚙️ → Enter API key → Save
                    ↓
2. Write Python code in editor
                    ↓
3. Click ✨ AI Visualize
                    ↓
4. Wait for "Analyzing..." to finish (1-3 sec)
                    ↓
5. See visualization appear
                    ↓
6. Use Play/Pause/Step controls
                    ↓
7. Click different code to analyze new algorithm
```

---

## 📋 Checklist

- [ ] Visit makersuite.google.com
- [ ] Get Gemini API key
- [ ] Click ⚙️ button
- [ ] Paste API key
- [ ] Click Save
- [ ] Write Python code
- [ ] Click ✨ AI Visualize
- [ ] Enjoy the visualization!

---

## 🌐 Links

- **Get API Key**: https://makersuite.google.com/
- **Gemini Docs**: https://ai.google.dev/
- **This Project**: https://github.com/sawal612/html.codeVisualizer
- **Google AI Studio**: https://makersuite.google.com/

---

## 📚 Documentation Files

- **INDEX.md** - Navigation guide
- **QUICK_START.md** - 3-step guide
- **GEMINI_SETUP.md** - Detailed setup
- **IMPLEMENTATION.md** - Technical details
- **ARCHITECTURE.md** - System design
- **UI_GUIDE.md** - Visual guide
- **FEATURE_SUMMARY.md** - Feature overview

---

## ✨ Features at a Glance

| Feature | Status | Details |
|---------|--------|---------|
| AI Code Analysis | ✅ Ready | Powered by Gemini |
| Custom Algorithms | ✅ Ready | Any Python code |
| Multiple Data Types | ✅ Ready | Arrays, Lists, Trees |
| Secure API Key | ✅ Ready | Local storage |
| Error Handling | ✅ Ready | User-friendly messages |
| Animation Controls | ✅ Ready | Play/Pause/Step |

---

## 🚀 You're All Set!

Everything is installed and ready to use.

**Start now:**
1. Click ⚙️ API Key button
2. Paste your Gemini API key
3. Write Python code
4. Click ✨ AI Visualize
5. Explore the visualization!

---

**Happy coding! 🎉**

*Last Updated: January 7, 2026*
*Status: Ready to Use*
