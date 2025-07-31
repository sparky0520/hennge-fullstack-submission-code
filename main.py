def compute(arr: list[str], sum: int):
    if arr == []:
        return sum
    else:
        item = int(arr.pop(0))
        if(item < 0):
            sum += (item**4)
        return compute(arr, sum)

def process(arr: list[str], count: int):
    if(arr == [] or count == 0):
        return
    else:
        num = int(arr.pop(0))
        numList = arr.pop(0).split()
        if(num != len(numList)):
            print(-1)
        else:
            sum = compute(numList, 0)
            print(sum)
        count-= 1
        process(arr, count)
        
def main():
    import sys
    inp = sys.stdin.read()
    list1 = inp.splitlines()
    count = int(list1.pop(0))
    process(list1, count)


if __name__ == "__main__":
    main()